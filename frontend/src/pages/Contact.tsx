import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

const ease = [0.19, 1, 0.22, 1] as const;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await apiRequest("/query/addquery", {
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

      toast.success("Inquiry sent successfully.");
      setFormData({ name: "", email: "", contact: "", description: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send inquiry");
    } finally {
      setSubmitting(false);
    }
  };

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

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="spark-input"
              placeholder="John Doe"
            />
          </div>

          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="spark-input"
              placeholder="john@university.edu"
            />
          </div>

          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value.replace(/\D/g, "") })}
              className="spark-input"
              placeholder="9876543210"
            />
          </div>

          <div className="border-b border-border pb-4 focus-within:border-primary transition-colors">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Your Message
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="spark-input resize-none"
              placeholder="Tell us about what you need."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-6 bg-primary text-white rounded-xl text-lg font-medium overflow-hidden relative group disabled:opacity-70"
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
            <p className="text-lg">hello@sparkconsultancy.com</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Location</p>
            <p className="text-lg">India · Remote Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
