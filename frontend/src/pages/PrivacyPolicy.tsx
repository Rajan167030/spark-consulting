import { motion } from "framer-motion";

const ease = [0.19, 1, 0.22, 1] as const;

const sections = [
  {
    title: "Information We Collect",
    body:
      "We may collect details you submit through contact forms, including your name, email address, phone number, and message content. We may also collect basic usage information needed to maintain and improve the website experience.",
  },
  {
    title: "How We Use Information",
    body:
      "Spark Consultancy uses submitted information to respond to enquiries, coordinate student or partner communication, improve services, and maintain internal records related to placements, hiring conversations, and support requests.",
  },
  {
    title: "Data Sharing",
    body:
      "We do not sell personal information. Information may be shared internally with relevant team members or trusted service providers only when required to operate the website, respond to your request, or support our consulting and placement workflow.",
  },
  {
    title: "Data Security",
    body:
      "We take reasonable administrative and technical measures to protect submitted information. While no online system can guarantee absolute security, we work to prevent unauthorized access, misuse, or disclosure.",
  },
  {
    title: "Your Rights",
    body:
      "You may request updates or deletion of the information you have shared with us, subject to legal or operational requirements. For privacy-related requests, please contact us using the email address listed on the contact page.",
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Privacy Policy
          </span>
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">
            Your information should be handled with care.
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            This Privacy Policy explains how Spark Consultancy collects, uses, and protects the
            information shared through this website.
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Effective date: April 5, 2026
          </p>
        </motion.div>

        <div className="mt-16 space-y-8 border-t border-border pt-10">
          {sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease }}
              className="rounded-[1.5rem] border border-border bg-card p-7 shadow-sm"
            >
              <h2 className="font-display text-2xl tracking-tight">{section.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{section.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
