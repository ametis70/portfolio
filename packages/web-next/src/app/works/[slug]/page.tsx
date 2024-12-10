import type { PaginatedDocs } from "payload";
import type { Work } from "@portfolio/cms";

import fetchFromCMS from "@/util/fetch";

export async function generateStaticParams() {
  const { docs } = await fetchFromCMS<PaginatedDocs<Work>>(
    `/works?depth=1&draft=false&locale=en`,
  );

  return docs.map((work) => ({
    slug: work.id,
  }));
}

export default async function Work({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let data = await fetchFromCMS<Work>(
    `/works/${slug}?depth=1&draft=false&locale=en`,
  );

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}
