import Link from "next/link";
import StoriesSearch from "./components/storiesFilteredSearch/storiesFilteredSearch.component";
import StoriesList from "./components/storiesList/storiesList.component";
import {
  PageSection,
  SectionTitle,
  StoriesSection,
} from "../shared/components/layout/Section";
import { Button } from "../shared/components/button/button";
import StoriesToggle from "./components/StoriesToggle/storiesToggle.component";
import {
  getHiddenStoriesAction,
  getStoriesAction,
} from "@/lib/internal-api/actions/story.actions";
import { getCategoriesAction } from "@/lib/internal-api/actions/categories.actions";

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

  const { stories } = await (showHidden
    ? getHiddenStoriesAction()
    : getStoriesAction(filters));
  const { categories } = await getCategoriesAction();

  return (
    <PageSection>
      <SectionTitle>Stories</SectionTitle>
      <StoriesToggle showHidden={showHidden} />

      <StoriesSection>
        <StoriesSearch categories={categories} initialFilters={filters} />
        <>
          <StoriesList stories={stories} />
          <Button className="cornered">
            <Link href="/admin/story/create">Add</Link>
          </Button>
        </>
      </StoriesSection>
    </PageSection>
  );
}
