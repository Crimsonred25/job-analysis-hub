import { useRef, useCallback } from "react";
import { Download } from "lucide-react";

declare global {
  interface Window {
    html2pdf: any;
  }
}

interface PdfDownloadButtonProps {
  targetId: string;
  filename: string;
  label?: string;
  className?: string;
}

export default function PdfDownloadButton({ targetId, filename, label = "Download as PDF", className }: PdfDownloadButtonProps) {
  const loadingRef = useRef(false);

  const loadHtml2Pdf = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.html2pdf) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load html2pdf.js"));
      document.head.appendChild(script);
    });
  }, []);

  const handleDownload = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      await loadHtml2Pdf();

      const element = document.getElementById(targetId);
      if (!element) {
        alert("Form content not found. Please fill out the form first.");
        return;
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
          before: ".page-break-before",
          after: ".page-break-after",
          avoid: [
            "tr",
            "td",
            ".avoid-break",
            "table",
          ],
        },
      };

      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      loadingRef.current = false;
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={className || "flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"}
    >
      <Download className="w-4 h-4" />
      {label}
    </button>
  );
}
