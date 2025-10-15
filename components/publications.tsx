"use client";

import { Pagination } from "@heroui/pagination";
import { useState } from "react";

import publicationsData from "@/data/publications.json";

export function Publications() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  return (
    <div className="mt-4 space-y-6">
      {(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPublications = publicationsData.slice(
          startIndex,
          endIndex,
        );

        return currentPublications.map((pub, index) => (
          <div key={index} className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{pub.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pub.institution} •{" "}
                {new Date(pub.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {pub.description}
              </p>
            </div>
            <div className="space-y-3">
              {pub.body.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ));
      })()}
      {publicationsData.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            showControls
            showShadow
            page={currentPage}
            total={Math.ceil(publicationsData.length / itemsPerPage)}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
