"use client";

import { useState } from "react";

import { Page, Document, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

function Resume() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numPages, setNumPages] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} scale={1.25} />
    </Document>
  );
}

export default Resume;
