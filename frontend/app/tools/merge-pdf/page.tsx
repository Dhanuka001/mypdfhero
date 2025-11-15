import { ToolPageTemplate } from "@/components/ToolPageTemplate";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { getToolSeoContent } from "@/content/tool-pages";
import { buildMetadata } from "@/lib/metadata";

const seoContent = getToolSeoContent("merge-pdf");

export const metadata = buildMetadata({
  title: "Merge PDF Files Online Free | Quick & Secure | MyPDFHero",
  description: "Merge PDF files online in seconds. Preserve quality, stay secure, and keep your page order perfectly aligned.",
  path: "/tools/merge-pdf",
  keywords: [
    "merge pdf without losing quality",
    "merge pdf online free no watermark",
    "merge pdf on mobile",
    "combine pdf files windows mac",
  ],
});

export default function MergePdfPage() {
  return (
    <>
      <ToolPageTemplate
        title="Merge PDF Files Online Free (No Quality Loss)"
        description="Stack multiple PDFs together and walk away with one organized document."
        endpoint="/api/pdf/merge"
        fieldName="files"
        accept="application/pdf"
        helperText="Drop up to 10 PDFs (20MB each). We will keep your page order and stitch everything together."
        primaryActionLabel="Merge PDFs"
        multiple
        maxFiles={10}
      />
      {seoContent && <ToolSeoContent content={seoContent} />}
    </>
  );
}
