import { ToolPageTemplate } from "@/components/ToolPageTemplate";

export default function JpgToPdfPage() {
  return (
    <ToolPageTemplate
      title="JPG to PDF"
      description="Turn photos, scans, and screenshots into a clean PDF pack with proper margins."
      endpoint="/api/pdf/jpg-to-pdf"
      steps={[
        "Upload up to 10 JPG or PNG images.",
        "We align, rotate, and compress the images for print-ready clarity.",
        "Save the freshly generated PDF to your device.",
      ]}
    />
  );
}
