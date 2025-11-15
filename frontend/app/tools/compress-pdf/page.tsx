import { ToolPageTemplate } from "@/components/ToolPageTemplate";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { getToolSeoContent } from "@/content/tool-pages";
import { buildMetadata } from "@/lib/metadata";

const seoContent = getToolSeoContent("compress-pdf");

export const metadata = buildMetadata({
  title: "Compress PDF Online Free | No Watermark | MyPDFHero",
  description: "Compress PDF files online for free with no watermark. Fast, secure, and built for email-size exports.",
  path: "/tools/compress-pdf",
  keywords: [
    "compress pdf online free",
    "reduce pdf file size without losing quality",
    "compress pdf for email size limit",
    "pdf compressor 2025",
    "best free pdf compressor online",
  ],
});

export default function CompressPdfPage() {
  return (
    <>
      <ToolPageTemplate
        title="Compress PDF – Free Online PDF Compressor (No Watermark)"
        description="Shrink bloated PDFs into lightweight files that still look crisp on every device."
        endpoint="/api/pdf/compress"
        fieldName="file"
        accept="application/pdf"
        helperText="Drop a single PDF up to 20MB, and we will rebalance fonts and images without hurting readability."
        primaryActionLabel="Compress PDF"
        multiple={false}
        maxFiles={1}
      />
      {seoContent && <ToolSeoContent content={seoContent} />}
    </>
  );
}
