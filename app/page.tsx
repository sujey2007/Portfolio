import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Hero />
      <About />
      {/* Projects anchor — target for "Look My Work" button */}
      <section id="projects" className="relative scroll-mt-6 bg-[#050508] py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur">
            <p className="text-center text-sm text-white/40">
              Projects — placeholder for upcoming Projects section. &quot;Look My Work&quot; scrolls here via #projects.
              <br />
              Future content will showcase Sakshi (KAAVAL Hackathon) and AgriVerse (Hack with Uttar Pradesh) and more.
            </p>
          </div>
        </div>
      </section>
      {/* Contact anchor — target for "Contact Me" button */}
      <section id="contact" className="relative scroll-mt-6 bg-[#050508] py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur">
            <p className="text-center text-sm text-white/40">
              Contact — placeholder for upcoming Contact section. &quot;Contact Me&quot; scrolls here via #contact.
              <br />
              H SUJEY — sujeyhariprasad4@gmail.com — Chennai 600078, India —{" "}
              <a href="https://github.com/sujey2007" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 hover:decoration-white/40">
                github.com/sujey2007
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
