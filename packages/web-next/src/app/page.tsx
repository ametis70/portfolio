import Link from "next/link";
import type { PaginatedDocs } from "payload";
import type { Work } from "@portfolio/cms";

import fetchFromCMS from "@/util/fetch";

export default async function Home() {
  let data = await fetchFromCMS<PaginatedDocs<Work>>(
    `/works?depth=1&draft=false&locale=en`,
  );

  return (
    <>
      <ol>
        {data.docs.map((doc: { id: string }) => (
          <li key={doc.id}>
            <Link href={`/works/${doc.id}`}>{doc.id}</Link>
          </li>
        ))}
      </ol>
      <details>
        <summary>JSON</summary>
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </details>
    </>
  );
}
