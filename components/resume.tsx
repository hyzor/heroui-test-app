'use client';

import { useState } from 'react';

import { Page, Document, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

function Resume() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Document file='/resume.pdf' onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} scale={1.25} />
    </Document>
  )
}

export default Resume;