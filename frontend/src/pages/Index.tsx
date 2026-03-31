import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Globe2, Sparkles, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import { apiRequest } from "@/lib/api";
import CompanyLogoCard from "@/components/CompanyLogoCard";
import Beams from "@/components/Beams";
import { useIsMobile } from "@/hooks/use-mobile";

const ease = [0.19, 1, 0.22, 1] as const;

const stats = [
  { value: "500+", label: "Students Placed" },
  { value: "120+", label: "Partner Companies" },
  { value: "95%", label: "Placement Rate" },
  { value: "12", label: "Countries" },
];

type Company = {
  _id: string;
  name: string;
  logo: string;
};

const featuredCompanies: Company[] = [
  {
    _id: "featured-google",
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    _id: "featured-microsoft",
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    _id: "featured-amazon",
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    _id: "featured-deloitte",
    name: "Deloitte",
    logo: "https://logo.clearbit.com/deloitte.com",
  },
  {
    _id: "featured-ey",
    name: "EY",
    logo: "https://logo.clearbit.com/ey.com",
  },
  {
    _id: "featured-goldman-sachs",
    name: "Goldman Sachs",
    logo: "https://logo.clearbit.com/goldmansachs.com",
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
    outcome: "Secured 2 offers after 11 mentor sessions",
  },
  {
    quote:
      "The difference was how specific the feedback was. Every mock interview felt like training with someone who already knew the bar I had to clear.",
    name: "Maya Chen",
    role: "Associate Consultant, McKinsey",
    outcome: "Moved from campus shortlist to final offer",
  },
  {
    quote:
      "I did not need more generic advice. I needed access, clarity, and pressure-tested prep. Spark delivered all three.",
    name: "Rohan Kapoor",
    role: "Software Engineer, Amazon",
    outcome: "Placed in 8 weeks from cohort start",
  },
];

const Index = () => {
  const [clientCompanies, setClientCompanies] = useState<Company[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  const trustedCompanies = useMemo(() => {
    const uniqueByName = new Map<string, Company>();

    [...featuredCompanies, ...clientCompanies].forEach((company) => {
      const key = company.name.trim().toLowerCase();
      if (!uniqueByName.has(key)) {
        uniqueByName.set(key, company);
      }
    });

    return Array.from(uniqueByName.values());
  }, [clientCompanies]);

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

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await apiRequest("/company/getcompany");
        const companies = Array.isArray(data) ? (data as Company[]) : [];
        setClientCompanies(companies);
      } catch {
        setClientCompanies([]);
      } finally {
        setCompaniesLoading(false);
      }
    }

    loadCompanies();
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
            beamColor={isDark ? "#dbeafe" : "#1e3a8a"}
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
                Apply for Cohort
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#trusted-companies"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-medium text-foreground transition-colors duration-300 hover:bg-secondary"
              >
                Explore Companies
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
          {companiesLoading && trustedCompanies.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-card px-6 py-10 text-center text-muted-foreground">
              Loading partner companies...
            </div>
          ) : null}

          {!companiesLoading && trustedCompanies.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-card px-6 py-10 text-center text-muted-foreground">
              Partner companies will appear here once they are added by admin.
            </div>
          ) : null}

          {trustedCompanies.length > 0 ? (
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
          ) : null}
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
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Testimonials</span>
            <h2 className="mt-5 text-4xl font-display tracking-tight md:text-6xl">
              Students remember the precision, not just the result.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The strongest outcomes came from structured feedback, deliberate positioning, and mentors willing to be exacting.
            </p>
          </motion.div>

          <div className="mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
            <motion.div
              className="flex w-max gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 42,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeTestimonials.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  aria-hidden={index >= testimonials.length}
                  className="flex h-full w-[22rem] shrink-0 flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-sm md:w-[24rem]"
                >
                  <p className="text-2xl leading-snug text-foreground">“{testimonial.quote}”</p>
                  <div className="mt-8 border-t border-border pt-5">
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-primary">{testimonial.outcome}</p>
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
