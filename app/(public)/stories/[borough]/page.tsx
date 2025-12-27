import StoriesPageComponent from "../components/StoriesPage/storiesPage.component";
import { getBoroughMetadata } from "@/app/constants/metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ borough: string }>;
}) {
  const { borough } = await params;
  return getBoroughMetadata(borough);
}

export default async function Page({
  params,
}: {
  params: Promise<{ borough: string }>;
}) {
  const { borough } = await params;
  return <StoriesPageComponent boroughParam={borough} />;
}
