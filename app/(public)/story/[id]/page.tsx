import { getStory } from "@/app/database/repositories/story.repository";
import StoryPage from "./storyPage";
import seoKeywords from "@/app/constants/seoKeywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    return {
      title: "Story Not Found",
      description: "The story you are looking for does not exist.",
    };
  }

  const story = await getStory(id);
  if (!story) {
    return {
      title: "Story Not Found",
      description: "The story you are looking for does not exist.",
    };
  }

  const thumbnail = story.thumbnail;

  const cleanSummary =
    story.summary?.slice(0, 160).replace(/\n/g, " ") ||
    "A story shared on The Not Project.";

  return {
    title: `${story.title} | The Not Project`,
    description: cleanSummary,
    openGraph: {
      title: `${story.title} | The Not Project`,
      description: cleanSummary,
      url: `https://www.thenotproject.com/story/${story.id}`,
      type: "article",
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.title} | The Not Project`,
      description: cleanSummary,
      images: [thumbnail],
    },
    keywords: seoKeywords.story,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StoryPage id={id} />;
}
