import type { Metadata } from "next";
import { ToolPageTemplate } from "@/components/ToolPageTemplate";

export const metadata: Metadata = {
  title: "Convert JPG or PNG to PDF | MyPDFHero",
  description: "Turn receipts, photos, and whiteboard snapshots into a neat PDF packet with perfect page sizing.",
};

export default function JpgToPdfPage() {
  return (
    <ToolPageTemplate
      title="JPG to PDF"
      description="Turn images and scans into a single PDF that is easy to store, sign, or share."
      endpoint="/api/pdf/jpg-to-pdf"
      fieldName="images"
      accept="image/jpeg,image/png"
      helperText="Drop JPG or PNG files (up to 10 at a time). We keep your upload order so pages stay organized."
      primaryActionLabel="Convert to PDF"
      multiple
      maxFiles={10}
    />
  );
}
