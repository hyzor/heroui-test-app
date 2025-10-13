import { subtitle } from "@/components/primitives";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <main>
      <Section headingLevel={1} id="home" title="Jesper Falkenby">
        <div className={subtitle({ class: "mt-4" })}>Full-Stack Developer</div>
      </Section>
      <Section headingLevel={2} id="resume" title="Résumé" />
      <Section headingLevel={2} id="publications" title="Publications" />
      <Section headingLevel={2} id="about" title="About" />
      <Section headingLevel={2} id="contact" title="Contact" />
    </main>
  );
}
