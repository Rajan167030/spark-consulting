import { motion } from "framer-motion";
import Manager from "@/assets/Manager.jpg";
import sparkfather from "@/assets/sparkfather.jpeg";
import TiltedCard from "@/components/TiltedCard";
const ease = [0.19, 1, 0.22, 1] as const;

const values = [
  {
    number: "01",
    title: "Precision Matching",
    description: "We don't do mass applications. Every student is matched to opportunities that align with their unique trajectory.",
  },
  {
    number: "02",
    title: "Elite Mentorship",
    description: "Our mentors are operators — senior engineers, partners, and founders who've been where you want to go.",
  },
  {
    number: "03",
    title: "Long-term Relationships",
    description: "We measure success in careers, not placements. Our alumni network spans 12 countries and growing.",
  },
];

const leadership = [
  {
    name: "Rudra Pratap Singh",
    role: "Managing Director",
    image: Manager,
    focus: ["Hiring Systems", "Career Strategy", "Partner Relations"],
  },
  {
    name: "Dhirender singh",
    role: "Chief exectuive officer",
    image: sparkfather ,
    focus: ["Operations", "Employer Network", "Student Success"],
  },
];

const About = () => {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-4xl"
        >
          <span className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4 block">
            About Spark
          </span>
          <h1 className="font-display text-5xl md:text-7xl mb-8 tracking-tight">
            We exist to close the gap.
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-[60ch] mb-8">
            Spark was founded in 2019 with a simple thesis: the best talent is everywhere,
            but opportunity is not. We built a consultancy that pairs high-achieving students
            with the companies and mentors who can accelerate their careers.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[60ch]">
            Today, we've placed over 500 students across 120+ companies in technology, finance,
            and consulting. Our approach is deliberately bespoke — small cohorts, deep relationships,
            and an unwavering focus on outcomes.
          </p>
        </motion.div>

        {/* Values */}
        <div className="mt-32 border-t border-border">
          <h2 className="font-display text-4xl md:text-5xl mt-16 mb-16 tracking-tight">
            How we operate.
          </h2>
          <div className="space-y-0">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                className="flex flex-col md:flex-row gap-6 md:gap-16 py-12 border-b border-border"
              >
                <span className="text-sm text-muted-foreground font-mono">{value.number}</span>
                <div className="max-w-lg">
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mt-32 max-w-3xl"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-8 tracking-tight">
            Built by operators, <br />for the next generation.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our team includes former hiring leads at Google, portfolio managers at Goldman Sachs,
            and startup founders who understand what it takes to build exceptional careers.
            We don't teach theory — we share playbooks that work.
          </p>
        </motion.div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Team
          </p>
          <div className="grid gap-8 md:max-w-5xl md:grid-cols-2">
            {leadership.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, ease }}
                className="group relative overflow-hidden rounded-[2rem] border border-border/40 bg-gradient-to-br from-card/80 via-card/60 to-card/40 p-7 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-8 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] hover:border-primary/30 transition-all duration-500"
              >
                {/* Animated gradient accent — top-right */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-gradient-to-br from-primary/25 via-blue-400/15 to-violet-500/10 blur-2xl group-hover:scale-125 group-hover:from-primary/35 group-hover:via-blue-400/25 transition-all duration-700" />
                {/* Bottom-left subtle glow */}
                <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-violet-500/10 via-primary/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative flex flex-col">
                  <div className="mb-6 flex flex-col items-center gap-5">
                    <div className="relative flex h-[360px] w-[280px] shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-primary/10 via-slate-100 to-blue-50 p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_24px_rgba(59,130,246,0.12)] transition-shadow duration-500">
                      <TiltedCard
                        imageSrc={member.image}
                        altText={member.name}
                        captionText={`${member.name} - ${member.role}`}
                        containerHeight="348px"
                        containerWidth="272px"
                        imageHeight="348px"
                        imageWidth="272px"
                        rotateAmplitude={12}
                        scaleOnHover={1.08}
                        showMobileWarning={false}
                        showTooltip
                        displayOverlayContent
                        overlayContent={
                          <p className="tilted-card-demo-text">{member.name}</p>
                        }
                      />
                    </div>

                    <div className="text-center">
                      <h3 className="font-display text-[2rem] leading-none tracking-tight md:text-[2.2rem] group-hover:text-primary transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="mt-3 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-primary font-medium shadow-[0_2px_8px_rgba(59,130,246,0.08)]">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80 font-medium">
                      Core focus
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {member.focus.map((item, i) => (
                        <span
                          key={item}
                          className="rounded-full border border-border/60 bg-gradient-to-r from-secondary/90 to-secondary/50 px-3.5 py-1.5 text-xs text-foreground/90 font-medium shadow-sm hover:border-primary/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
