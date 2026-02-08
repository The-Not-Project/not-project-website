import { getStories } from "@/lib/prisma/repositories/story.repository";
import StoriesList from "../storiesList/storiesList.component";

export default async function StoriesWrapper({ filters, boroughName }: { filters: any; boroughName: string }) {
  const stories = await getStories(filters);
  return <StoriesList stories={stories} borough={boroughName} />;
}