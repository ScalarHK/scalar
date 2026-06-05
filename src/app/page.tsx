import WaitlistForm from "@/components/WaitlistForm";
import {
  Zap,
  Search,
  Bot,
  Clock,
  RefreshCw,
  Mail,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const BOTTLENECKS = [
  { icon: Clock, label: "Manually chasing invoices & follow-ups" },
  { icon: RefreshCw, label: "Copy-pasting data between tools all day" },
  { icon: Mail, label: "Writing the same emails over and over" },
  { icon: AlertTriangle, label: "Reporting that takes hours every week" },
];

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Bottleneck Audit",
    description:
      "We map your entire workflow and pinpoint exactly where time, money, and energy are leaking. No guesswork — just data.",
  },
  {
    number: "02",
    icon: Bot,
    title: "Custom Automation Blueprint",
    description:
      "We design AI automations tailored to your specific tools and processes. You approve the plan before a single line of code is written.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Deploy & Scale",
    description:
      "We build, test, and deploy everything for you. Then we monitor it, iterate, and keep it running as your business grows.",
  },
];

const PERKS = [
  "Free bottleneck audit ($500 value)",
  "Priority onboarding — skip the queue",
  "Locked-in founder pricing forever",
  "Direct access to our founding team",
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#06080f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Scalar</span>
          </div>
          <a
            href="#waitlist"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 pt-24 pb-32 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #06b6d4 0%, #8b5cf6 50%, transparent 80%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Now accepting early access applications
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Your business has{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              bottlenecks.
            </span>
            <br />
            We find them.
            <br />
            Then automate them away.
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Scalar is an AI automation studio for solopreneurs and SMEs. We diagnose
            the hidden drag in your operations and build custom automations that give
            you back your time — and your growth.
          </p>

          <div id="waitlist" className="w-full max-w-md pt-2">
            <WaitlistForm variant="hero" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-slate-500">
            {["No credit card", "Free audit for early members", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Sound familiar?
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              You&apos;re too busy{" "}
              <span className="text-slate-500">working <em>in</em></span>
              {" "}your business
              <br />
              to work <span className="text-white">on</span> it.
            </h2>
            <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
              Every day you&apos;re doing the same repetitive tasks instead of growing your
              business. That&apos;s not a you problem — it&apos;s an automation problem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {BOTTLENECKS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-white/15 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-slate-300 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-violet-950/60 border border-cyan-500/20 text-center">
            <p className="text-2xl font-bold text-white">
              The average SME owner wastes{" "}
              <span className="text-cyan-400">15+ hours per week</span> on tasks
              that could be automated.
            </p>
            <p className="text-slate-400 mt-3 text-sm">
              That&apos;s 780 hours a year. Almost 20 full work-weeks. What would you do with that time?
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
              How it works
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Three steps from bottleneck
              <br />
              to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                full automation
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="relative flex flex-col gap-5 p-7 rounded-3xl bg-white/3 border border-white/8 hover:border-white/15 hover:bg-white/5 transition group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-5xl font-black text-white/5 group-hover:text-white/8 transition leading-none">
                    {number}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Who it&apos;s for
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Built for builders who are{" "}
              <span className="text-slate-500 line-through">drowning</span>{" "}
              <span className="text-white">ready to scale</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                emoji: "🧑‍💻",
                title: "Solopreneurs",
                desc: "You're doing it all yourself. Let's automate the parts that don't need you.",
              },
              {
                emoji: "🏢",
                title: "Small Businesses",
                desc: "You've got a team but you're still glued to manual processes. We fix that.",
              },
              {
                emoji: "📈",
                title: "Growing SMEs",
                desc: "Revenue is up but so is the chaos. Time to build the systems that scale.",
              },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-7 rounded-3xl bg-white/3 border border-white/8 hover:border-white/15 transition"
              >
                <span className="text-4xl">{emoji}</span>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early access perks + second CTA */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-violet-950/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-pink-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Early access
              </p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
                Join now,{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  get more.
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                The first 100 members get exclusive perks that won&apos;t be
                available after launch.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    </div>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full">
              <div className="p-8 rounded-3xl bg-white/4 border border-white/10">
                <h3 className="text-xl font-bold mb-2 text-center">Reserve your spot</h3>
                <p className="text-slate-500 text-sm text-center mb-6">
                  Spots are limited. Be first in line.
                </p>
                <WaitlistForm variant="footer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm">Scalar</span>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Scalar. Find bottlenecks. Automate them away.
          </p>
          <div className="flex gap-4 text-xs text-slate-600">
            <a
              href="mailto:hello@scalarhk.com"
              className="hover:text-slate-400 transition flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              hello@scalarhk.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
