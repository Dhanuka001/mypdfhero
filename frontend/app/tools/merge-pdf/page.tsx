import { ToolPageTemplate } from "@/components/ToolPageTemplate";

export default function MergePdfPage() {
  return (
    <ToolPageTemplate
      title="Merge PDF"
      description="Combine multiple PDF files into a single polished document with custom ordering."
      endpoint="/api/pdf/merge"
      steps={[
        "Drop the PDFs in the order you want (or drag to reorder).",
        "We stack the files and normalize page sizes in seconds.",
        "Download the merged PDF when you are satisfied.",
      ]}
    />
  );
}
