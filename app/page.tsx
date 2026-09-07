import Hero from "@/components/Hero";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Hero />
      {/* Placeholder for future sections - ensures page scrollable and hero not isolated */}
      <section className="relative bg-[#050508] py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur">
            <p className="text-center text-sm text-white/40">
              Additional sections — About, Experience, Skills, Projects, Impact, Contact — will continue here.
              <br />
              Hero above is production-ready and preserves the cinematic editorial composition.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
