"use client";

import { title } from "@/components/primitives";

interface SectionProps {
  id: string;
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}

export function Section({
  id,
  title: sectionTitle,
  headingLevel = 2,
  children,
}: SectionProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen"
      id={id}
    >
      <div className="inline-block max-w-3xl text-center">
        <HeadingTag className={title()}>{sectionTitle}</HeadingTag>
        {children}
      </div>
    </section>
  );
}
