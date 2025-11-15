export type ToolSeoContentConfig = {
  slug: string;
  headings: {
    features: string;
    howTo: string;
    faq: string;
  };
  intro: string[];
  features: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedTools: { label: string; href: string; description: string }[];
  relatedBlogs: { label: string; href: string; description: string }[];
  schema: {
    howTo: {
      name: string;
      description: string;
    };
  };
};

export const toolSeoContent: Record<string, ToolSeoContentConfig> = {
  "compress-pdf": {
    slug: "compress-pdf",
    headings: {
      features: "Features of MyPDFHero PDF Compressor",
      howTo: "How to Compress PDF Online (Step-by-Step)",
      faq: "Compress PDF FAQs",
    },
    intro: [
      "MyPDFHero’s PDF compressor is designed for the exact scenarios people stress over: admissions portals that reject files above 5 MB, HR systems that want a single attachment, and collaboration tools that complain when you upload a deck from your phone. The engine balances font subsetting, vector cleaning, and smart downscaling so you keep legibility while slicing the file size dramatically. Everything runs inside your browser session with zero logins and no watermark on the finished document.",
      "Because the workflow mirrors the audits we perform for enterprise clients, the compressor understands print versus screen intent, maintains color profiles for branding teams, and auto-detects scanned pages to remove the gray background haze. You can trust the output for legal packets, classroom submissions, and visa paperwork. When the job finishes, your files are deleted automatically, making this a safe daily helper for freelancers, students, and corporate operators alike.",
    ],
    features: [
      {
        title: "High-quality compression",
        description: "Adaptive image sampling and font optimization keep charts, signatures, and annotation layers intact.",
      },
      {
        title: "Email-ready sizes",
        description: "Smart presets aim for 1–5 MB exports so you can send the PDF through Gmail, Outlook, or ATS portals.",
      },
      {
        title: "Scanned PDF cleanup",
        description: "Removes scanner noise and flattens background textures to reclaim extra megabytes.",
      },
      {
        title: "Secure + temporary",
        description: "Encrypted uploads auto-delete minutes after completion, satisfying internal compliance needs.",
      },
      {
        title: "Works everywhere",
        description: "Optimized for mobile browsers so you can rescue a bloated PDF from iOS, Android, or Chromebooks.",
      },
    ],
    steps: [
      { title: "Upload the PDF", description: "Drop or browse for your file (up to 20 MB) and confirm it appears in the queue." },
      {
        title: "Let optimization run",
        description: "Our engine analyzes fonts, images, and vector layers to decide the lightest lossless settings.",
      },
      {
        title: "Watch the progress meter",
        description: "You’ll see a live compression percentage and tips like “Preparing for email-size export.”",
      },
      {
        title: "Download instantly",
        description: "Grab the optimized PDF with no watermark and attach it to email, LMS, or HR portals.",
      },
    ],
    faqs: [
      {
        question: "How do I compress a PDF without losing quality?",
        answer:
          "Upload the original file, keep it under 20 MB, and let MyPDFHero’s adaptive presets handle the balancing act. We only reduce resolution when the page type can handle it, so charts and text stay crisp.",
      },
      {
        question: "Will the PDF look the same after compression?",
        answer:
          "Yes. Fonts, layout, signatures, and form fields remain identical because the tool does not rasterize text layers.",
      },
      {
        question: "Can I compress a scanned PDF?",
        answer:
          "Absolutely. The compressor targets background noise and gradients common in scans, reclaiming megabytes while keeping stamps legible.",
      },
      {
        question: "Is there a watermark or footer?",
        answer: "No. Every export is a clean PDF with no watermark, so you can share it with clients or upload to government portals.",
      },
      {
        question: "How small can you make my PDF for email?",
        answer:
          "Most documents land between 0.5 MB and 3 MB, which satisfies Gmail, Outlook, and job application portals that cap attachments at 10–25 MB.",
      },
      {
        question: "Do you store my compressed PDF?",
        answer:
          "No. Files are deleted automatically minutes after processing or as soon as you close the tab, whichever comes first.",
      },
      {
        question: "Can I compress multiple PDFs at once?",
        answer:
          "This tool currently handles one file at a time to guarantee the best result, but you can immediately queue another document after downloading the first.",
      },
      {
        question: "Does it work on phones?",
        answer:
          "Yes. The UI is tuned for mobile browsers, so you can compress a PDF directly from iOS Files, Android storage, or Chromebook downloads.",
      },
    ],
    relatedTools: [
      {
        label: "Merge PDF tool",
        href: "/tools/merge-pdf",
        description: "Combine multiple compressed files into one package without re-uploading elsewhere.",
      },
      {
        label: "JPG to PDF converter",
        href: "/tools/jpg-to-pdf",
        description: "Turn image scans into PDFs first, then compress the result for mobile sharing.",
      },
    ],
    relatedBlogs: [
      {
        label: "How to Compress a PDF Without Losing Quality",
        href: "/blog/how-to-compress-pdf",
        description: "Covers the ideal export settings and troubleshooting advice for stubborn documents.",
      },
      {
        label: "5 Ways to Make a PDF Smaller for Email",
        href: "/blog/make-pdf-smaller-for-email",
        description: "Walks through multiple approaches including desktop apps and MyPDFHero.",
      },
      {
        label: "How to Reduce PDF Size Below 1 MB",
        href: "/blog/reduce-pdf-size-below-1mb",
        description: "Perfect for scholarship, visa, or grant portals with strict size limits.",
      },
    ],
    schema: {
      howTo: {
        name: "How to compress a PDF online with MyPDFHero",
        description:
          "Follow these steps to shrink a PDF without losing quality using the free MyPDFHero compressor.",
      },
    },
  },
  "merge-pdf": {
    slug: "merge-pdf",
    headings: {
      features: "Features of MyPDFHero Merge PDF Tool",
      howTo: "How to Merge PDF Files Online",
      faq: "Merge PDF FAQs",
    },
    intro: [
      "MyPDFHero’s merge tool is tuned for people stitching receipts, contracts, coursework, and onboarding packets. Instead of installing a heavy desktop app, drag up to ten PDFs and keep their order with simple arrows or drag handles. The engine preserves bookmarks, hyperlinks, and page sizes so the final document feels as if it was authored in Acrobat—minus the subscription.",
      "It also handles mixed sources such as scanned pages, exported slide decks, and e-signed agreements. Because the merger runs on the same secure infrastructure as our compressor, files are encrypted in transit and deleted shortly after export. The output arrives in seconds, ready to email, print, or re-upload to e-sign platforms.",
    ],
    features: [
      {
        title: "Lossless merging",
        description: "No re-encoding of images or fonts, so every page looks identical to the source files.",
      },
      {
        title: "Order control",
        description: "Rearrange files before merging to match the storyline of your packet or proposal.",
      },
      {
        title: "Mobile-friendly queue",
        description: "Upload from iOS Files or Android storage without desktop software.",
      },
      {
        title: "Secure processing",
        description: "Files are encrypted over HTTPS and removed automatically minutes after the download.",
      },
      {
        title: "Works with large batches",
        description: "Handle up to ten PDFs (20 MB each) to consolidate semester notes, invoices, or HR kits.",
      },
    ],
    steps: [
      {
        title: "Add your PDFs",
        description: "Drop up to ten PDFs into the uploader. You can mix scans, exported decks, and signed contracts.",
      },
      {
        title: "Arrange the order",
        description: "Drag files into the perfect sequence so the merged PDF tells a coherent story.",
      },
      {
        title: "Start the merge",
        description: "Click “Merge PDFs” and let MyPDFHero combine every page with lossless precision.",
      },
      {
        title: "Download + share",
        description: "Grab the merged PDF with one click and send it to teammates, clients, or teachers.",
      },
    ],
    faqs: [
      {
        question: "How do I merge PDF files without losing quality?",
        answer:
          "Upload them to MyPDFHero, keep each file under 20 MB, arrange the order, and export. We never downsample pages, so images and annotations stay intact.",
      },
      {
        question: "Can I merge password-protected PDFs?",
        answer:
          "Unlock the file first in your PDF viewer, then re-save it without a password before uploading. Once unlocked, MyPDFHero can merge it with the rest.",
      },
      {
        question: "Does the tool work on Windows, Mac, and mobile?",
        answer:
          "Yes. The merger runs entirely in the browser, so any device with Chrome, Safari, or Edge can upload and export files.",
      },
      {
        question: "Is there a limit to how many PDFs I can combine?",
        answer:
          "You can merge up to ten PDFs per session. After you download the combined file, repeat the process with more batches if needed.",
      },
      {
        question: "Will page numbers or bookmarks break?",
        answer:
          "No. Existing pagination and bookmarks remain untouched because we simply concatenate the PDFs instead of rasterizing them.",
      },
      {
        question: "Can I merge PDFs on my phone?",
        answer:
          "Definitely. The interface is optimized for mobile so you can select files from iOS Files, Android Downloads, or cloud storage apps.",
      },
      {
        question: "How long do you keep merged PDFs?",
        answer:
          "Just long enough to let you download them. Files are purged automatically minutes after completion for privacy.",
      },
      {
        question: "Does MyPDFHero add branding to the merged file?",
        answer: "No. The final PDF is free of watermarks or footers, making it professional enough for clients and government offices.",
      },
    ],
    relatedTools: [
      {
        label: "Compress PDF tool",
        href: "/tools/compress-pdf",
        description: "Shrink the merged file so it fits strict upload limits without reformatting pages.",
      },
      {
        label: "JPG to PDF converter",
        href: "/tools/jpg-to-pdf",
        description: "Convert scans into PDFs first, then add them to the merge queue for a spotless package.",
      },
    ],
    relatedBlogs: [
      {
        label: "How to Combine PDF Files on Windows and Mac",
        href: "/blog/combine-pdf-windows-mac",
        description: "Covers desktop shortcuts plus the MyPDFHero workflow.",
      },
      {
        label: "How to Merge PDFs on Mobile (Android/iPhone)",
        href: "/blog/merge-pdf-on-mobile",
        description: "Shows how to merge files from cloud storage when you’re traveling.",
      },
      {
        label: "Fix “PDF Files Not Merging” Error Easily",
        href: "/blog/fix-pdf-files-not-merging",
        description: "Troubleshoots corrupted files, password issues, and format mismatches.",
      },
    ],
    schema: {
      howTo: {
        name: "How to merge PDF files online with MyPDFHero",
        description: "Combine multiple PDFs into one document using the free MyPDFHero merge tool.",
      },
    },
  },
  "jpg-to-pdf": {
    slug: "jpg-to-pdf",
    headings: {
      features: "Features of MyPDFHero JPG to PDF Converter",
      howTo: "How to Convert JPG to PDF Online",
      faq: "JPG to PDF FAQs",
    },
    intro: [
      "MyPDFHero’s JPG to PDF converter helps students, remote employees, and field technicians turn photo evidence into polished PDFs. Instead of emailing a messy batch of images, drop your JPG or PNG files and we’ll align margins, match orientation, and generate a clean multi-page PDF. It’s perfect for expense receipts, lab notebooks, sketches, or classroom assignments captured with a phone camera.",
      "The converter keeps native resolution for print-quality exports while optimizing file sizes for sharing. You choose the upload order, we preserve it, and you can pair the result with the compressor if you need an email-safe file. Like every MyPDFHero workflow, uploads travel over HTTPS and delete themselves minutes after completion, so your private notes stay private.",
    ],
    features: [
      {
        title: "High-quality conversion",
        description: "Maintains crisp text and drawings by embedding images at their optimal DPI.",
      },
      {
        title: "Order + orientation control",
        description: "Pages stay in the exact order you uploaded, and we auto-rotate sideways photos.",
      },
      {
        title: "Mobile optimized",
        description: "Built for mobile browsers so you can convert images directly from your camera roll.",
      },
      {
        title: "Print-ready output",
        description: "Balanced margins ensure the PDF looks professional when printed or signed.",
      },
      {
        title: "Secure file handling",
        description: "Images delete automatically shortly after export—no lingering copies.",
      },
    ],
    steps: [
      {
        title: "Upload JPG or PNG files",
        description: "Add up to ten images captured from your phone, scanner, or DSLR.",
      },
      {
        title: "Reorder if needed",
        description: "Drag thumbnails to match the story you want to tell—receipts, steps, or lab notes.",
      },
      {
        title: "Convert to PDF",
        description: "Hit “Convert to PDF” and let MyPDFHero align orientation and margins automatically.",
      },
      {
        title: "Download + continue",
        description: "Grab the PDF instantly and, if needed, run it through the compressor for smaller emails.",
      },
    ],
    faqs: [
      {
        question: "How do I convert JPG to PDF for free?",
        answer:
          "Use MyPDFHero’s converter: upload your JPG or PNG images, click convert, and download the PDF without sign-ups or fees.",
      },
      {
        question: "Will the PDF be high enough quality for printing?",
        answer:
          "Yes. We preserve the original resolution and embed images at a high DPI so the PDF is ready for printers or e-sign platforms.",
      },
      {
        question: "Can I convert photos on mobile?",
        answer:
          "Absolutely. The interface is tuned for touchscreens, so you can select photos straight from your camera roll or cloud storage.",
      },
      {
        question: "What file formats are supported?",
        answer: "JPG and PNG uploads are supported today, with HEIC and WebP on the roadmap.",
      },
      {
        question: "Is there a page limit?",
        answer:
          "You can add up to ten images per conversion. Need more? Export once, then repeat the process with the next batch.",
      },
      {
        question: "Will my files be secure?",
        answer:
          "Yes. Photos are transmitted via HTTPS, stored temporarily, and deleted automatically minutes after processing.",
      },
      {
        question: "Can I reorder images before converting?",
        answer:
          "Yes. Drag and drop to rearrange pages so the PDF reflects the sequence you need for homework, expense reports, or onboarding.",
      },
      {
        question: "Does the converter add a watermark?",
        answer: "No. The PDF is completely clean so you can submit it to teachers, HR teams, or courts.",
      },
    ],
    relatedTools: [
      {
        label: "Compress PDF tool",
        href: "/tools/compress-pdf",
        description: "Shrink the exported PDF to stay under strict upload limits.",
      },
      {
        label: "Merge PDF tool",
        href: "/tools/merge-pdf",
        description: "Combine the converted PDF with contracts, worksheets, or onboarding packets.",
      },
    ],
    relatedBlogs: [
      {
        label: "How to Convert JPG to PDF on Any Device",
        href: "/blog/convert-jpg-to-pdf-any-device",
        description: "Explains native OS tricks plus the MyPDFHero approach.",
      },
      {
        label: "The Best Way to Convert Photos to PDF",
        href: "/blog/best-way-to-convert-photos-to-pdf",
        description: "Great for students and field teams who need step-by-step visuals.",
      },
      {
        label: "How to Convert Screenshots to PDF",
        href: "/blog/convert-screenshots-to-pdf",
        description: "Covers workflows for iOS, Android, and PCs with MyPDFHero as the fastest option.",
      },
    ],
    schema: {
      howTo: {
        name: "How to convert JPG images to PDF with MyPDFHero",
        description: "Turn multiple JPG or PNG files into a single PDF using the free MyPDFHero converter.",
      },
    },
  },
};

export function getToolSeoContent(slug: string): ToolSeoContentConfig {
  const content = toolSeoContent[slug];
  if (!content) {
    throw new Error(`Missing tool SEO content for ${slug}`);
  }
  return content;
}
