import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ease = [0.19, 1, 0.22, 1] as const;

const faqs = [
  {
    question: "Who can contact Spark Consultancy?",
    answer:
      "Students, hiring partners, training institutes, and companies can all use this form to reach the team.",
  },
  {
    question: "How quickly will I get a response?",
    answer:
      "Most enquiries are reviewed within 24 to 48 business hours, depending on request volume and the nature of the enquiry.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Share your goal, your current situation, and the kind of support you need so the team can respond more precisely.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", description: "" });
  const [errors, setErrors] = useState({ name: "", email: "", contact: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [queryNumber, setQueryNumber] = useState<string | null>(null);

  // Validate form fields
  const validateForm = () => {
    const newErrors = { name: "", email: "", contact: "", description: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
      isValid = false;
    } else if (formData.contact.length < 10) {
      newErrors.contact = "Contact number must be at least 10 digits";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Message is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submission
    if (!validateForm()) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiRequest("/query/addquery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          contact: formData.contact.trim(),
          description: formData.description.trim(),
        }),
      });

      // Extract query ID from response
      const id = response && typeof response === 'object' && 'queryId' in response 
        ? (response as { queryId: string }).queryId 
        : null;
      
      if (id) {
        setQueryNumber(id);
      }
      
      toast.success(`Inquiry sent successfully! Your query number is #${id}`);
      setFormData({ name: "", email: "", contact: "", description: "" });
      setErrors({ name: "", email: "", contact: "", description: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  // Check if all fields are filled for submit button
  const isFormValid = 
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.contact.trim() !== "" &&
    formData.description.trim() !== "";

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="font-display text-5xl md:text-6xl mb-4 tracking-tight text-center">
            Start a conversation.
          </h1>
          <p className="text-muted-foreground text-lg text-center mb-16 max-w-[45ch] mx-auto">
            Whether you're a student, a company, or a hiring partner, you can reach the admin team directly from here.
          </p>
        </motion.div>

        {queryNumber && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <p className="text-green-800 dark:text-green-100 font-semibold">
              ✅ Your inquiry has been submitted successfully!
            </p>
            <p className="text-green-700 dark:text-green-200 mt-2">
              Your Query Number: <span className="font-bold text-lg">#{queryNumber}</span>
            </p>
            <p className="text-green-700 dark:text-green-200 mt-2">
              A confirmation email has been sent to your email address. We will reach out to you soon.
            </p>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="spark-input"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="spark-input"
              placeholder="john@university.edu"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              value={formData.contact}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                setFormData({ ...formData, contact: digitsOnly });
                if (errors.contact) setErrors({ ...errors, contact: "" });
              }}
              className="spark-input"
              placeholder="9876543210"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>

          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: "" });
              }}
              className="spark-input resize-none"
              placeholder="Tell us about what you need."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting || !isFormValid}
            className="w-full py-6 bg-primary text-white rounded-xl text-lg font-medium overflow-hidden relative group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {submitting ? "Sending Inquiry..." : "Send Inquiry"}
            </span>
            <div className="absolute inset-0 bg-spark-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.form>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Email</p>
            <p className="text-lg">operation@thesparkconsulting.in</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Location</p>
            <p className="text-lg">India · Support</p>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">FAQ</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
              Common questions before you reach out.
            </h2>
          </motion.div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="rounded-[1.5rem] border border-border bg-card px-6 py-2 shadow-sm data-[state=open]:bg-muted/50 transition-colors"
                  >
                    <AccordionTrigger className="text-xl font-medium text-foreground hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
