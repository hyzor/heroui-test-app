"use client";

import { useState, useEffect } from "react";

import { Page, Document, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

function Resume() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numPages, setNumPages] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile: scale to fit screen width with some padding
        const screenWidth = width - 40; // 20px padding on each side
        setScale(screenWidth / 600);
      } else if (width < 768) {
        // Small tablet
        setScale(1.0);
      } else if (width < 1024) {
        // Large tablet
        setScale(1.2);
      } else {
        // Desktop: fixed scale
        setScale(1.4);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className={isMobile ? "overflow-x-auto px-5" : ""}>
      <div className={isMobile ? "min-w-fit" : "flex justify-center"}>
        <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
}

export default Resume;
