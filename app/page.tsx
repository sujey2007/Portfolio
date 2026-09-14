import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsGlobe from "@/components/SkillsGlobe";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Hero />
      <About />
      <Experience />
      <SkillsGlobe />
      <Projects />
      <Contact />
    </main>
  );
}
