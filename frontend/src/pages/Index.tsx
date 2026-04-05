import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Globe2, Sparkles, TrendingUp, Quote } from "lucide-react";
import { useTheme } from "next-themes";
import CompanyLogoCard from "@/components/CompanyLogoCard";
import Beams from "@/components/Beams";
import { useIsMobile } from "@/hooks/use-mobile";
import paytmLogo from "@/assets/paytm.png";
import screenshotOne from "@/assets/Screenshot 2026-04-05 163639.png";
import screenshotTwo from "@/assets/Screenshot 2026-04-05 163704.png";
import screenshotThree from "@/assets/Screenshot 2026-04-05 163723.png";
import screenshotFour from "@/assets/Screenshot 2026-04-05 163750.png";

const ease = [0.19, 1, 0.22, 1] as const;

const stats = [
  { value: "5000+", label: "Students Placed" },
  { value: "120+", label: "Partner Companies" },
  { value: "95%", label: "Placement Rate" },
  { value: "12", label: "Countries" },
];

type Company = {
  _id: string;
  name: string;
  logo: string;
};

const trustedCompanies: Company[] = [
  {
    _id: "trusted-paytm",
    name: "Paytm",
    logo: paytmLogo,
  },
  {
    _id: "trusted-screen-1",
    name: "Netambit",
    logo: screenshotOne,
  },
  {
    _id: "trusted-screen-2",
    name: "Market soft",
    logo: screenshotTwo,
  },
  {
    _id: "trusted-screen-3",
    name: "Quess",
    logo: screenshotThree,
  },
  {
    _id: "trusted-screen-4",
    name: "Vahan",
    logo: screenshotFour,
  },
];

const pathways = [
  {
    title: "Career Positioning",
    description:
      "We tighten your narrative, portfolio, and communication so recruiters understand your edge in minutes.",
  },
  {
    title: "Mentor-Led Preparation",
    description:
      "Interview loops, live feedback, and role-specific mock sessions run by operators who hire for the roles you want.",
  },
  {
    title: "Warm Introductions",
    description:
      "You enter curated hiring conversations through partner teams instead of cold application funnels.",
  },
];

const testimonials = [
  {
    quote:
      "Spark turned a scattered job search into a precise plan. I went from second-guessing my profile to closing two offers in three weeks.",
    name: "Aarav Mehta",
    role: "Incoming Product Analyst, Stripe",
    outcome: "",
  },
  {
    quote:
      "The difference was how specific the feedback was. Every mock interview felt like training with someone who already knew the bar I had to clear.",
    name: "Maya gupta",
    role: "Associate Consultant, McKinsey",
    outcome: "",
  },
  {
    quote:
      "I did not need more generic advice. I needed access, clarity, and pressure-tested prep. Spark delivered all three.",
    name: "Rohan Kapoor",
    role: "Software Engineer, Amazon",
    outcome: "",
  },
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  const marqueeCompanies = useMemo(
    () => [...trustedCompanies, ...trustedCompanies],
    [trustedCompanies],
  );

  const marqueeTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [],
  );

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-75 dark:opacity-90">
          <Beams
            beamWidth={isMobile ? 2 : 3}
            beamHeight={isMobile ? 18 : 30}
            beamNumber={isMobile ? 12 : 20}
            lightColor={isDark ? "#93c5fd" : "#1d4ed8"}
            backgroundColor={isDark ? "#020617" : "#f8fafc"}
            speed={isMobile ? 1.6 : 2}
            noiseIntensity={isDark ? 1.8 : 1.3}
            scale={0.2}
            rotation={isMobile ? 24 : 30}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_28%)]" />
        <div className="relative z-20 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Career Acceleration, Rebuilt
            </span>
            <h1 className="mt-8 text-5xl font-display leading-[0.9] tracking-tight sm:text-7xl lg:text-[6.5rem]">
              Build a placement story that recruiters actually remember.
            </h1>
            <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Spark combines elite mentorship, targeted preparation, and curated hiring access so ambitious students move faster into global roles.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-spark-charcoal px-8 py-4 font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/ourpartners"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-medium text-foreground transition-colors duration-300 hover:bg-secondary"
              >
                Our Patners
              </a>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4 backdrop-blur">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm font-medium text-foreground">Curated mentor bench</p>
                <p className="mt-1 text-sm text-muted-foreground">Operators from top firms, not generic coaches.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 backdrop-blur">
                <TrendingUp className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm font-medium text-foreground">Outcome-led process</p>
                <p className="mt-1 text-sm text-muted-foreground">Every sprint ties back to real interviews and offers.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 backdrop-blur">
                <Globe2 className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm font-medium text-foreground">Global hiring network</p>
                <p className="mt-1 text-sm text-muted-foreground">Access across consulting, product, finance, and tech.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="trusted-companies" className="border-y border-border bg-white px-6 py-12 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Trusted by our client partners</p>
          <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 26,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeCompanies.map((company, index) => (
                <div
                  key={`${company._id}-${index}`}
                  aria-hidden={index >= trustedCompanies.length}
                  className="flex w-[170px] shrink-0"
                >
                  <CompanyLogoCard name={company.name} logo={company.logo} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">How Spark Works</span>
            <h2 className="mt-5 text-4xl font-display tracking-tight md:text-6xl">
              A sharper path from ambition to offer.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
              We keep the process intentionally narrow: fewer students, deeper preparation, and clearer signal at every stage of the hiring cycle.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {pathways.map((pathway, index) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease }}
                className="rounded-[1.75rem] border border-border bg-card p-7 shadow-sm"
              >
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">0{index + 1}</span>
                <h3 className="mt-4 text-2xl font-display text-foreground">{pathway.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{pathway.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-spark-charcoal px-8 py-10 text-white md:px-12 md:py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
            >
              <p className="text-4xl font-display tracking-tight md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/55">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-3xl"
          >
            <h2 className="mt-5 text-4xl font-display tracking-tight md:text-6xl">
              Students remember the precision, not just the result.
            </h2>
          </motion.div>

          <div className="mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex w-max gap-8 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 45,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeTestimonials.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  aria-hidden={index >= testimonials.length}
                  className="group relative flex h-full w-[24rem] shrink-0 flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-card/80 to-card/40 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 md:w-[28rem]"
                >
                  <div className="absolute -right-8 -top-8 rounded-full bg-primary/5 p-10 transition-transform duration-700 group-hover:scale-125">
                    <Quote className="h-16 w-16 text-primary/20" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-primary/80 text-primary/80 drop-shadow-sm" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="relative z-10 mt-10 flex items-center gap-5 border-t border-border/50 pt-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary ring-4 ring-background">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{testimonial.outcome}</p>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-secondary px-6 py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 text-4xl font-display tracking-tight text-foreground md:text-6xl"
          >
            Ready to turn potential into a cleaner hiring narrative?
          </motion.h2>
          <p className="mx-auto mb-10 max-w-[50ch] text-lg text-muted-foreground">
            Join the next cohort and get matched with mentors, interview prep, and introductions calibrated to the roles you actually want.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-lg font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
