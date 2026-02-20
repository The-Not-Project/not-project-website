import { getStoriesAction } from "@/lib/internal-api/actions/story.actions";

export async function GET() {
  const baseUrl = "https://www.thenotproject.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/donate",
    "/profile",
    "/stories",
  ];
  const staticUrls = staticRoutes.map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`,
  );

  // Borough routes
  const boroughs = ["bronx", "brooklyn", "manhattan", "queens", "statenisland"];
  const boroughUrls = boroughs.map(
    (b) => `
  <url>
    <loc>${baseUrl}/stories/${b}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`,
  );

  // Dynamic story routes
  const { stories } = await getStoriesAction();
  const storyUrls = stories.map(
    (story) => `
  <url>
    <loc>${baseUrl}/story/${story.id}</loc>
    <lastmod>${new Date(story.updatedAt || story.createdAt).toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
`,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.join("")}
  ${boroughUrls.join("")}
  ${storyUrls.join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
