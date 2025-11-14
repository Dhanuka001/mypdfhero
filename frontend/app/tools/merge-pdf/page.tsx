import type { Metadata } from "next";
import { ToolPageTemplate } from "@/components/ToolPageTemplate";

export const metadata: Metadata = {
  title: "Merge PDFs Online | MyPDFHero",
  description:
    "Combine contracts, invoices, or scans into a single polished PDF that is easy to store and share.",
};

export default function MergePdfPage() {
  return (
    <ToolPageTemplate
      title="Merge PDF"
      description="Stack multiple PDFs together and walk away with one organized document."
      endpoint="/api/pdf/merge"
      fieldName="files"
      accept="application/pdf"
      helperText="Drop up to 10 PDFs (20MB each). We will keep your page order and stitch everything together."
      primaryActionLabel="Merge PDFs"
      multiple
      maxFiles={10}
    />
  );
}
