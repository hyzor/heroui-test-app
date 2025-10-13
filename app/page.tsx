import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <div>
      {/* Home Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen"
      >
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>

      {/* Docs Section */}
      <section
        id="docs"
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen"
      >
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className={title()}>Documentation</h1>
          <div className={subtitle({ class: "mt-4" })}>
            Learn how to use HeroUI components in your projects.
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen"
      >
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className={title()}>Pricing</h1>
          <div className={subtitle({ class: "mt-4" })}>
            Choose the plan that works best for you.
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen"
      >
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className={title()}>Blog</h1>
          <div className={subtitle({ class: "mt-4" })}>
            Stay updated with the latest news and tutorials.
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen"
      >
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className={title()}>About</h1>
          <div className={subtitle({ class: "mt-4" })}>
            Learn more about our mission and team.
          </div>
        </div>
      </section>
    </div>
  );
}
