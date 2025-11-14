import Link from "next/link";
import { getApiBaseUrl } from "@/lib/config";

type ToolPageTemplateProps = {
  title: string;
  description: string;
  endpoint: string;
  steps: string[];
};

export function ToolPageTemplate({ title, description, endpoint, steps }: ToolPageTemplateProps) {
  const apiUrl = `${getApiBaseUrl()}${endpoint}`;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 text-[#120529]">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-purple-500">PDF TOOL</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-[#120529] md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-[#4b3b63] md:text-xl">{description}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-sm">
          <p className="text-lg font-semibold text-[#120529]">Upload placeholder</p>
          <p className="mt-2 text-sm text-[#4b3b63]">
            Drag & drop up to 10 files (20MB each). Hooked up API integration will live here.
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-purple-300 bg-[#f9f4ff] p-8 text-center text-[#4b3b63]">
            Drop files or click to upload
          </div>
          <button
            className="mt-6 w-full rounded-full bg-[#7c3aed] py-3 text-base font-bold text-white transition hover:bg-[#6d32d4]"
            type="button"
          >
            Process files (coming soon)
          </button>
          <p className="mt-4 text-xs text-[#7a7197]">API endpoint: {apiUrl}</p>
        </div>

        <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#120529]">Results</h2>
          <p className="mt-2 text-sm text-[#4b3b63]">
            Download links, compression stats, and helpful tips will display here once the backend syncs up.
          </p>
          <div className="mt-6 rounded-2xl bg-[#f3edff] p-6 text-sm text-[#4b3b63]">
            <p className="font-semibold text-[#120529]">Status</p>
            <p className="mt-2">Waiting for files...</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-purple-50 bg-gradient-to-r from-[#f3edff] to-[#fde8ff] p-8">
        <h3 className="text-2xl font-semibold text-[#120529]">How it works</h3>
        <ol className="mt-4 space-y-3 text-[#4b3b63]">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#7c3aed] shadow">
                {index + 1}
              </span>
              <p className="text-base">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-[#120529]">FAQ</h3>
        <div className="mt-4 space-y-4 text-[#4b3b63]">
          <div>
            <p className="font-semibold text-[#120529]">Is uploading safe?</p>
            <p className="text-base">
              Yes. Files are processed over HTTPS and deleted automatically right after your download completes.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#120529]">Do I need an account?</p>
            <p className="text-base">No login required—just drop your files and go.</p>
          </div>
          <div>
            <p className="font-semibold text-[#120529]">Need another tool?</p>
            <p className="text-base">
              Tell us what to build next at <Link href="mailto:hello@mypdfhero.com" className="font-semibold text-[#7c3aed] underline">hello@mypdfhero.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
