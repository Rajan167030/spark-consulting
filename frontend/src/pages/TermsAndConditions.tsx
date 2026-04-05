import { motion } from "framer-motion";

const ease = [0.19, 1, 0.22, 1] as const;

const sections = [
  {
    title: "Use of Website",
    body:
      "By accessing this website, you agree to use it only for lawful purposes and in a way that does not harm the website, the business, or other users. You must not attempt unauthorized access, misuse forms, or interfere with normal operation.",
  },
  {
    title: "Service Information",
    body:
      "All information on this website is provided for general informational and business communication purposes. Spark Consultancy may update offerings, service descriptions, and website content at any time without prior notice.",
  },
  {
    title: "User Submissions",
    body:
      "When you submit information through the website, you are responsible for ensuring that the details shared are accurate and lawful. You must not submit false, misleading, or third-party information without permission.",
  },
  {
    title: "Intellectual Property",
    body:
      "Website content, branding, copy, layouts, and visual assets are the property of Spark Consultancy or their respective owners unless otherwise stated. They may not be copied, reused, or distributed without permission.",
  },
  {
    title: "Limitation of Liability",
    body:
      "Spark Consultancy is not liable for indirect, incidental, or consequential damages arising from use of the website, temporary unavailability, or reliance on publicly available site content. Users should contact the team directly for service-specific confirmations.",
  },
];

const TermsAndConditions = () => {
  return (
    <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Terms & Conditions
          </span>
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">
            Clear terms for using the Spark Consultancy website.
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            These terms govern access to this website and the use of its public content,
            communication forms, and business enquiry features.
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

export default TermsAndConditions;
