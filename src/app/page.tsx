import { Zap, ArrowDown, CalendarDays, Mail } from "lucide-react";
import AuditTool from "@/components/audit/AuditTool";
import { PROBLEM_ITEMS } from "@/lib/audit-data";

const SERVICES = [
  "Sales pipeline and CRM setup",
  "Lead capture and follow-up systems",
  "AI workflow implementation",
  "BD and partnership strategy",
  "Proposal and pitch material improvement",
  "KPI and reporting dashboards",
  "Founder operating rhythm",
  "Investor-readiness support",
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#06080f] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#06080f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Scalar</span>
          </div>
          <a
            href="#audit-start"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Start Free Audit
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20 pb-24 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #06b6d4 0%, #8b5cf6 50%, transparent 80%)" }}
        />

        <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-wider">
            Free · No signup required
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]">
            Find Where Your Business Is{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Leaking Time, Leads & Sales
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Complete a practical founder systems audit across your sales pipeline, lead capture, follow-up, operations, AI workflows, reporting, and growth bottlenecks.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#audit-start"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 transition-all"
            >
              Start the Free Audit
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#whats-included"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition text-slate-300"
            >
              See What&apos;s Included
            </a>
          </div>

          <p className="text-xs text-slate-600">
            No signup required to start · Takes around 5 minutes
          </p>
        </div>
      </section>

      {/* Problem framing */}
      <section id="whats-included" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
              The real problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">
              Your business may not have a lead problem.
              <br />
              <span className="text-slate-400">It may have a systems problem.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Many early-stage businesses are losing revenue not because demand is missing, but because the operating system is messy. Leads come in from WhatsApp, Instagram, email, referrals, websites, events, and forms — but follow-up depends on memory, proposals are rewritten from scratch, customer notes are scattered, and reporting is manual.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
            {PROBLEM_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/3 border border-white/8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-r from-cyan-950/40 to-violet-950/40 border border-cyan-500/15">
            <p className="text-lg font-semibold text-white leading-relaxed max-w-3xl">
              &ldquo;Most founders do not need more tools. They need better systems. AI becomes useful when it is connected to the way the business actually captures leads, follows up, sells, reports, and operates.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Audit Tool */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              The audit
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              The Founder Systems Audit
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Complete a practical 5-minute audit across 12 business systems — then get a clear score showing what to fix first.
            </p>
          </div>

          <AuditTool />
        </div>
      </section>

      {/* Advisory CTA */}
      <section id="advisory" className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-violet-950/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-pink-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Advisory
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">
                Want help fixing the systems behind the score?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                I help founders and small business owners turn messy operations into clearer growth systems — including CRM setup, lead tracking, follow-up workflows, AI-assisted processes, BD strategy, reporting dashboards, and investor-readiness where relevant.
              </p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {SERVICES.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-80 w-full flex flex-col gap-4">
              <div className="p-6 rounded-3xl bg-white/4 border border-white/10 flex flex-col gap-4">
                <h3 className="font-bold text-lg">Book a Founder Systems Review</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Send your score and I&apos;ll suggest the first 2–3 systems I would fix. Practical, no-pitch conversation.
                </p>
                <a
                  href="https://calendly.com/YOUR_LINK_HERE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 transition text-sm"
                >
                  <CalendarDays className="w-4 h-4" />
                  Book a Founder Systems Review
                </a>
                <a
                  href={`mailto:hello@scalarhk.com?subject=Founder Systems Audit`}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-slate-300"
                >
                  <Mail className="w-4 h-4" />
                  Email me your score
                </a>
              </div>
              <p className="text-xs text-slate-600 text-center">
                No commitment. Just a clear conversation about where to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm">Scalar</span>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Scalar. Find bottlenecks. Automate them away.
          </p>
          <a
            href="mailto:hello@scalarhk.com"
            className="text-xs text-slate-600 hover:text-slate-400 transition flex items-center gap-1"
          >
            <Mail className="w-3 h-3" />
            hello@scalarhk.com
          </a>
        </div>
      </footer>
    </main>
  );
}
