import boroughs from "@/static/boroughs/boroughs.json";
import HeaderComponent from "./components/header/header.component";
import { SectionTitle, StoriesContainer } from "./components/style";
import SearchWrapper from "./components/searchWrapper/searchWrapper.component";
import { Suspense } from "react";
import StoriesWrapper from "./components/storiesWrapper/storiesWrapper.component";
import StoriesSearchSkeleton from "./components/storiesSearch/storiesSearch..skeleton";
import { Metadata } from "next";
import { storiesPageMetadata } from "@/static/metadata/metadata";
import StoriesListSkeleton from "./components/storiesList/storiesList.skeleton";

export const metadata : Metadata = storiesPageMetadata

interface PageProps {
  params: Promise<{ borough?: string[] }>;
  searchParams: Promise<{ q?: string; cat?: string | string[] }>;
}
export default async function Page({ params, searchParams }: PageProps) {
  const { borough } = await params;
  const { q, cat } = await searchParams;

  const boroughSlug = borough?.[0];

  const boroughKey = (boroughSlug?.toLowerCase() as keyof typeof boroughs) ?? "nyc"
  const currentBorough = boroughs[boroughKey] ?? boroughs.nyc;

  const selectedCategories = Array.isArray(cat) ? cat : cat ? [cat] : [];

  const filters = {
    search: q || "",
    boroughs: boroughSlug ? [boroughSlug.toLowerCase()] : [],
    categories: selectedCategories,
  };

  return (
    <main>
      <HeaderComponent borough={{...currentBorough, key: boroughKey}} />
      <SectionTitle>
        <h2>OUR ORIGINAL WORK</h2>
        <h3>Stories Of {currentBorough.name}</h3>
      </SectionTitle>
      <StoriesContainer>
        <Suspense fallback={<StoriesSearchSkeleton />}>
          <SearchWrapper filters={filters} />
        </Suspense>
        <Suspense fallback={<StoriesListSkeleton />}>
          <StoriesWrapper
            filters={filters}
            boroughName={currentBorough.name}
          />
        </Suspense>
      </StoriesContainer>
    </main>
  );
}
