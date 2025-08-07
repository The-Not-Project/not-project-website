import { Media, RawMedia } from '@/app/types/types';
import { pinata } from '@/app/utils/config';
import { prisma } from '../prisma';

export async function uploadFileToPinata(file: File): Promise<string> {
  const data = new FormData();
  data.set('file', file);

  const uploadResponse = await fetch(`${process.env.PUBLIC_API_BASE_URL}/files`, {
    method: 'POST',
    body: data,
  });

  if (!uploadResponse.ok) {
    throw new Error('File upload failed');
  }

  const cid = await uploadResponse.json();
  return cid;
}

export async function getMediaSignedUrl(cid: string, compression?: number): Promise<string> {
  'use server';
  try {
    const signedUrl = await pinata.gateways
      .createSignedURL({
        cid,
        expires: 60, 
      })
      .optimizeImage({
        width: compression ?? undefined,
        format: 'webp',
      });

    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate signed URL');
  }
}

export async function transformMedia(media: RawMedia, compression?: number): Promise<Media> {
  try {
    const signedUrl = await pinata.gateways
      .createSignedURL({
        cid: media.cid,
        expires: 60,
      })
      .optimizeImage({
        width: compression ?? undefined,
        format: 'webp',
      });

    return {
      ...media,
      id: media.id,
      url: signedUrl,
    };
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return {
      ...media,
      id: media.id,
      url: '/fallback-image.jpg',
    };
  }
}

export async function deleteMedia(mediaId: string) {
  'use server';  

  const cid = await prisma.media.findUnique({
    where: {
      id: mediaId,
    },
    select: {
      cid: true,
    },
  });

  console.log(mediaId, "OF TYPE", typeof mediaId);
  
  await prisma.media.delete(
    {
      where: {
        id: mediaId,
      },
    }
  )

  await pinata.files.delete([cid?.cid || '']);
}

export async function deleteMediaByStoryId(storyId: string) {
  'use server';

  const media = await prisma.media.findMany({
    where: {
      storyId,
    },
  });

  if (media.length > 0) {
    await pinata.files.delete(media.map(m => m.cid));
    await prisma.media.deleteMany({
      where: {
        storyId,
      },
    });
  }
}

export async function processMediaFile(stotyId: string, file: File) {
  'use server';
  const cid = await uploadFileToPinata(file);
  await prisma.media.create({
    data: {
      cid,
      storyId: stotyId,
      isThumbnail: false,
    },
  });

  return cid;
}