import { ToolPageTemplate } from "@/components/ToolPageTemplate";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { getToolSeoContent } from "@/content/tool-pages";
import { buildMetadata } from "@/lib/metadata";

const seoContent = getToolSeoContent("jpg-to-pdf");

export const metadata = buildMetadata({
  title: "JPG to PDF Converter Free | High Quality | MyPDFHero",
  description: "Convert JPG or PNG images to PDF for free. High-quality output that is print-ready and watermark-free.",
  path: "/tools/jpg-to-pdf",
  keywords: [
    "jpg to pdf converter free high quality",
    "convert images to pdf online",
    "jpg to pdf for printing",
    "convert photos to pdf students",
  ],
});

export default function JpgToPdfPage() {
  return (
    <>
      <ToolPageTemplate
        title="JPG to PDF Converter – Free Online Tool"
        description="Turn images and scans into a single PDF that is easy to store, sign, or share."
        endpoint="/api/pdf/jpg-to-pdf"
        fieldName="images"
        accept="image/jpeg,image/png"
        helperText="Drop JPG or PNG files (up to 10 at a time). We keep your upload order so pages stay organized."
        primaryActionLabel="Convert to PDF"
        multiple
        maxFiles={10}
      />
      {seoContent && <ToolSeoContent content={seoContent} />}
    </>
  );
}
