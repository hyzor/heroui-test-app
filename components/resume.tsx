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
        setScale(0.8);
      } else if (width < 768) {
        setScale(1.0);
      } else if (width < 1024) {
        setScale(1.2);
      } else {
        setScale(1.5);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} scale={scale} />
    </Document>
  );
}

export default Resume;
