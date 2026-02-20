import { uploadToS3WithCompression } from "@/app/utils/media";

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


export async function processThumbnail(file: File): Promise<string> {
  const url = await uploadToS3WithCompression(file);
  return url;
}
