interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Injects schema.org JSON-LD for rich search results. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
