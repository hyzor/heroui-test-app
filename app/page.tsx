"use client";

import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { useState } from "react";

import { subtitle } from "@/components/primitives";
import { Section } from "@/components/section";
import { GithubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import aboutData from "@/data/about.json";
import publicationsData from "@/data/publications.json";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  return (
    <main>
      <Section
        className="-mt-16"
        headingLevel={1}
        id="home"
        title="Jesper Falkenby"
      >
        <div className={subtitle({ class: "mt-2" })}>Full-Stack Developer</div>
      </Section>
      <Section headingLevel={2} id="resume" title="Résumé">
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Section>
      <Section headingLevel={2} id="publications" title="Publications">
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
                    <p
                      key={pIndex}
                      className="text-gray-700 dark:text-gray-300"
                    >
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
      </Section>
      <Section headingLevel={2} id="about" title="About">
        <div className="mt-4 space-y-4">
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>
      <Section headingLevel={2} id="contact" title="Contact">
        <div className="flex gap-4 mt-8">
          <Button
            as="a"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            size="lg"
            startContent={<GithubIcon size={24} />}
            target="_blank"
          >
            GitHub
          </Button>
          <Button
            as="a"
            href={siteConfig.links.linkedin}
            rel="noopener noreferrer"
            size="lg"
            startContent={<LinkedInIcon size={24} />}
            target="_blank"
          >
            LinkedIn
          </Button>
          <Button
            as="a"
            href={siteConfig.links.email}
            size="lg"
            startContent={<MailIcon size={24} />}
          >
            Email
          </Button>
        </div>
      </Section>
    </main>
  );
}
