import type { Metadata } from "next";
import { ToolPageTemplate } from "@/components/ToolPageTemplate";

export const metadata: Metadata = {
  title: "Compress PDF | MyPDFHero",
  description:
    "Shrink PDF file size without sacrificing clarity. Ideal for email attachments, LMS uploads, and online forms.",
};

export default function CompressPdfPage() {
  return (
    <ToolPageTemplate
      title="Compress PDF"
      description="Shrink bloated PDFs into lightweight files that still look crisp on every device."
      endpoint="/api/pdf/compress"
      fieldName="file"
      accept="application/pdf"
      helperText="Drop a single PDF up to 20MB, and we will rebalance fonts and images without hurting readability."
      primaryActionLabel="Compress PDF"
      multiple={false}
      maxFiles={1}
    />
  );
}
