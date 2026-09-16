/**
 * Renders a schema.org JSON-LD payload as a plain <script type="application/ld+json">
 * tag from a Server Component. `data` should be a JSON-serialisable schema.org
 * object (or an object using "@graph" to bundle several types in one script).
 *
 * The "<" escape mirrors Next.js's own documented JSON-LD pattern
 * (https://nextjs.org/docs/app/guides/json-ld) — it stops a literal "</script>"
 * appearing inside stringified content from prematurely closing the tag.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- static, server-generated JSON-LD, not user input
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
