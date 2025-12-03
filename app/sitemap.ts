// app/sitemap.ts
import { loadContent } from "@/data/content-loader";

export default async function sitemap() {
  const items = await loadContent();

  const dynamicRoutes = items.map((item) => ({
    url: `https://yourdomain.com/content/${item.slug}`,
    lastModified: item.publishedDate,
  }));

  return [
    {
      url: "https://yourdomain.com/",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/contact",
      lastModified: new Date(),
    },
    ...dynamicRoutes,
  ];
}
