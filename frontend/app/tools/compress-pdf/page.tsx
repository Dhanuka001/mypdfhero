import { ToolPageTemplate } from "@/components/ToolPageTemplate";

export default function CompressPdfPage() {
  return (
    <ToolPageTemplate
      title="Compress PDF"
      description="Squeeze oversized PDFs into lightweight files that keep sharp text and imagery."
      endpoint="/api/pdf/compress"
      steps={[
        "Upload or drag multiple PDFs up to 20MB each.",
        "We optimize fonts, remove duplicates, and rebalance images.",
        "Download the compressed file instantly.",
      ]}
    />
  );
}
