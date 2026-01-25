import { uploadToS3WithCompression } from "@/app/utils/media";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

/**
 * Extracts and validates story data from a FormData object.
 *
 * Expected form fields:
 * - `title` (string, required)
 * - `content` (string, required)
 * - `borough` (string, required)
 * - `summary` (string, required)
 * - `categories` (one or more category IDs, required)
 * - `thumbnail` (File, optional — but required for createStory)
 *
 * @throws Error if any of the required string fields are missing.
 *
 * @returns An object containing:
 *   - title
 *   - content
 *   - borough
 *   - summary
 *   - categoryIds (string[])
 *   - thumbnail (File | null)
 */
export function getStoryData(formData: FormData) {
  const [title, content, borough, summary] = [
    "title",
    "content",
    "borough",
    "summary",
  ].map((field) => formData.get(field)?.toString());

  const categoryIds = formData
    .getAll("categories")
    .map((val) => val.toString());

  const thumbnail = formData.get("thumbnail");

  if (!title || !content || !borough || !summary) {
    throw new Error("Missing required story fields");
  }

  return { title, content, borough, summary, categoryIds, thumbnail };
}

/**
 * Replaces a story's category links with the provided list.
 *
 * @param storyId - The ID of the story.
 * @param categoryIds - Array of category IDs to link to the story.
 *
 * Behavior:
 * - Deletes all existing `storyCategory` rows for the given story.
 * - Inserts a new row for each provided category ID.
 * - Safe to call for new stories — the delete step will simply remove zero rows.
 *
 * Notes:
 * - Uses a database transaction to ensure deletion and insertion happen atomically.
 * - `skipDuplicates` is enabled to avoid errors if duplicate category IDs are passed.
 */
export async function processCategories(
  storyId: string,
  categoryIds: string[],
) {
  "use server";

  const tx: Prisma.PrismaPromise<Prisma.BatchPayload>[] = [
    prisma.storyCategory.deleteMany({ where: { storyId } }),
  ];

  if (categoryIds.length) {
    tx.push(
      prisma.storyCategory.createMany({
        data: categoryIds.map((categoryId) => ({ storyId, categoryId })),
        skipDuplicates: true,
      }),
    );
  }

  await prisma.$transaction(tx);
}

/**
 * Removes all category links for a given story.
 *
 * @param id - The story ID.
 *
 * Side effects:
 * - Permanently deletes all related rows in `storyCategory`.
 */
export async function deleteStoryCategories(id: string) {
  "use server";

  await prisma.storyCategory.deleteMany({
    where: { storyId: id },
  });
}

/**
 * Uploads a thumbnail to S3 with compression.
 *
 * @param file - The thumbnail image file.
 * @returns A URL string pointing to the uploaded image.
 *
 * Notes:
 * - Uses `uploadToS3WithCompression` from `utils/media` for handling upload & optimization.
 */
export async function processThumbnail(file: File): Promise<string> {
  const url = await uploadToS3WithCompression(file);
  return url;
}

export const STORY_RELATIONS = {
  include: {
    categories: {
      include: {
        category: true,
      },
    },
    author: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    },
  },
};

const INTERNAL_FIELDS = {
  isTrashed: true,
  isRecommended: true,
  isRadar: true,
  content: true,
  updatedAt: true,
};

export type StoryWithRelations = Prisma.StoryGetPayload<{
  include: {
    categories: {
      include: {
        category: true;
      };
    };
    author: true;
  };
}>;

export async function fetchStories<T extends Prisma.StoryFindManyArgs>(
  args: T,
) {
  const stories = (await prisma.story.findMany({
    ...STORY_RELATIONS,
    ...args,
    omit: { ...INTERNAL_FIELDS, ...args.omit },
  })) as StoryWithRelations[];

  return stories.map(flattenCategories);
}

export function flattenCategories(story: StoryWithRelations) {
  return {
    ...story,
    categories: story.categories.map((c) => c.category),
  };
}
