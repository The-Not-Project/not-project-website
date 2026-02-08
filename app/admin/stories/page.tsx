import Link from "next/link";
import {
  getStories,
  getHiddenStories,
} from "@/lib/prisma/repositories/story.repository";
import { getCategories } from "@/lib/prisma/repositories/category.repository";
import StoriesSearch from "./components/storiesFilteredSearch/storiesFilteredSearch.component";
import StoriesList from "./components/storiesList/storiesList.component";
import {
  PageSection,
  SectionTitle,
  StoriesSection,
} from "../shared/components/layout/Section";
import { Button } from "../shared/components/button/button";
import StoriesToggle from "./components/StoriesToggle/storiesToggle.component";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const showHidden = params.trash === "true";
  const filters = {
    search: (params.search as string) || "",
    boroughs:
      typeof params.boroughs === "string"
        ? [params.boroughs]
        : (params.boroughs as string[]) || [],
    categories:
      typeof params.categories === "string"
        ? [params.categories]
        : (params.categories as string[]) || [],
  };

  const [stories, categories] = await Promise.all([
    showHidden ? getHiddenStories() : getStories(filters),
    getCategories(),
  ]);

  return (
    <PageSection>
      <SectionTitle>Stories</SectionTitle>
      <StoriesToggle showHidden={showHidden} />

      <StoriesSection>
        <StoriesSearch categories={categories} initialFilters={filters} />

        <div>
          <StoriesList stories={stories} />

          <Button className="cornered">
            <Link href="/admin/story/create">Add</Link>
          </Button>
        </div>
      </StoriesSection>
    </PageSection>
  );
}
