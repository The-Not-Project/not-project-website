import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { prisma } from '../prisma';
import { getUser } from './user.repository';
import {
  deleteStoryCategories,
  getStoryData,
  processAdditionalFiles,
  processCategories,
  processStories,
  processStory,
  processThumbnail,
  STORY_INCLUDE,
} from '../helpers/story.helpers';
import { deleteMedia, deleteMediaByStoryId } from '../helpers/media.helpers';
import { Filters, RawStory, Story } from '../../types/types';

export async function getStories(
  filters?: Filters,
  compression?: number
): Promise<Story[]> {
  'use server';

  const { search, boroughs, categories } = filters || {};

  await prisma.story.deleteMany({  // Clean up stories with empty fields
    where: {
      title: '',
      content: '',
      borough: '',
      summary: '',
    },
  })

  const stories = await prisma.story.findMany({
    where: {
      ...(search ? { title: { contains: search } } : {}),
      ...(boroughs && boroughs.length > 0 ? { borough: { in: boroughs } } : {}),
      ...(categories && categories.length > 0
        ? { categories: { some: { categoryId: { in: categories } } } }
        : {}),
    },
    include: STORY_INCLUDE,
  });

  return processStories(stories, compression);
}

export async function getStory(id: string, compression?: number): Promise<Story | null> {
  'use server'

  const story = await prisma.story.findUnique({
    where: { id },
    include: STORY_INCLUDE,
  });

  if (!story) return null;

  return processStory(story as RawStory, compression);
}

export async function createEmptyStory(): Promise<string> {
  'use server';

  const session = await getSession();
  if (!session) throw new Error('User not authenticated');

  const user = await getUser(session.user.sub);
  if (!user) throw new Error('User not found');

  if (!user.firstName || !user.lastName) {
    redirect('/admin/personal-info');
  }

  const newStory = await prisma.story.create({
    data: {
      title: '',
      content: '',
      borough: '',
      summary: '',
      author: { connect: { id: user.id } },
    },
  });

  return newStory.id;
}

export async function createStory(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) throw new Error('User not authenticated');

  const user = await getUser(session.user.sub);
  if (!user) throw new Error('User not found');
  
  if (!user.firstName || !user.lastName) {
    redirect('/admin/personal-info');
  }

  const { id, title, content, borough, summary, categoryIds, thumbnail, additionalFiles } =
    getStoryData(formData);

  if (!id) {
    throw new Error('Story ID is required');
  }

  const newStory = await prisma.story.update({
    where: { id },
    data: {
      title,
      content,
      borough,
      summary: summary,
      author: { connect: { id: user.id } },
    },
  });

  await processCategories(newStory.id, categoryIds);
  if (!thumbnail) {
    throw new Error('Thumbnail is required');
  }
  await processThumbnail(newStory.id, thumbnail as File);
  if (additionalFiles.length > 0) {
    await processAdditionalFiles(newStory.id, additionalFiles as File[]);
  }

  
}

export async function editStory(id: string, formData: FormData) {
  'use server';

  const { title, content, borough, summary, categoryIds, thumbnail, additionalFiles } =
    getStoryData(formData);

  const removedMediaIds = JSON.parse(formData.getAll('deletedMediaIds')[0] as string) as string[];

  await prisma.story.update({
    where: { id },
    data: { title, content, borough, summary },
  });

  await deleteStoryCategories(id);
  await processCategories(id, categoryIds);

  removedMediaIds.forEach(async (mediaId) => {    
    await deleteMedia(mediaId);
  });

  if (thumbnail) {
    await processThumbnail(id, thumbnail as File);
  }
  if (additionalFiles.length > 0) {
    await processAdditionalFiles(id, additionalFiles as File[]);
  }
}

export async function deleteStory(id: string) {
  'use server';

  await deleteMediaByStoryId(id);
  await deleteStoryCategories(id);

  await prisma.story.delete({
    where: {
      id,
    },
  });
}
