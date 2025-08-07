import { prisma } from '../prisma';
import { Category, RawMedia, RawStory, Story } from '@/app/types/types';
import { transformMedia, uploadFileToPinata } from './media.helpers';

export function getStoryData(formData: FormData) {
  const [id, title, content, borough, summary] = [
    'id',
    'title',
    'content',
    'borough',
    'summary',
  ].map(field => formData.get(field)?.toString());

  const categoryIds = formData.getAll('categories').map(val => val.toString());

  const thumbnail = formData.get('thumbnail');
  const additionalFiles = formData.getAll('additionalFiles')

  if (!title || !content || !borough || !summary) {
    throw new Error('Missing required story fields');
  }

  return { id, title, content, borough, summary, categoryIds, thumbnail, additionalFiles };
}

export async function processCategories(
  storyId: string,
  categoryIds: string[]
) {
  for (const catId of categoryIds) {
    await prisma.storyCategory.create({
      data: {
        storyId,
        categoryId: catId,
      },
    });
  }
}

export async function deleteStoryCategories(id: string) {
  'use server';

  await prisma.storyCategory.deleteMany({
    where: {
      storyId: id,
    },
  });
}

export async function processAdditionalFiles(storyId: string, files: File[]) {
  for (let i = 0; i < files.length; i++) {
    const cid = await uploadFileToPinata(files[i]);
    await prisma.media.create({
      data: {
        cid,
        storyId,
        isThumbnail: false,
      },
    });
  }
}

export async function processThumbnail(storyId: string, file: File) {
  const cid = await uploadFileToPinata(file);
  await prisma.media.create({
    data: {
      cid,
      storyId,
      isThumbnail: true,
    },
  });
}

export async function processStories(
  stories: RawStory[],
  compression?: number
): Promise<Story[]> {
  return Promise.all(stories.map(story => processStory(story, compression)));
}

export async function processStory(
  story: RawStory,
  compression?: number
): Promise<Story> {
  const mediaWithUrls = await Promise.all(
    story.media.map((media: RawMedia) => transformMedia(media, compression))
  );

  return {
    ...story,
    categories: story.categories.map(
      (sc: { category: Category }) => sc.category
    ),
    media: mediaWithUrls,
  };
}

export const STORY_INCLUDE = {
  categories: {
    include: {
      category: true,
    },
  },
  media: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
};
