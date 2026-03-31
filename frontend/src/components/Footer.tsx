import { Link } from "react-router-dom";
import { Instagram, Linkedin, MapPin, Twitter } from "lucide-react";

const navigationLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-spark-consulting/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/carrier_spark_consulting",
    icon: Instagram,
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

const Footer = () => (
  <footer className="px-4 pb-4 pt-10 md:px-6 md:pb-6">
    <div className="relative overflow-hidden rounded-[2rem] bg-spark-charcoal px-6 py-10 text-white md:px-10 md:py-12">
      <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">Spark Consultancy</p>
          <h3 className="mt-5 max-w-3xl text-4xl font-display leading-tight md:text-6xl">
            Designed for students who want signal, not noise.
          </h3>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68 md:text-lg">
            We build smaller, sharper placement systems for ambitious candidates and the companies looking for them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/72">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-[1.1fr_1.25fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">Navigate</p>
            <div className="mt-5 space-y-3">
              {navigationLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-base text-white/78 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">Get In Touch</p>
            <div className="mt-5 space-y-3 text-base text-white/78">
              <Link to="/contact" className="block transition-colors hover:text-white">
                Book an intro call
              </Link>
              <a href="mailto:hello@sparkconsultancy.co" className="block transition-colors hover:text-white">
                hello@sparkconsultancy.co
              </a>
              <a href="https://www.linkedin.com/company/the-spark-consulting/" className="block transition-colors hover:text-white">
                LinkedIn
              </a>
              <p className="flex items-start gap-2 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>3rd Floor, Sector 62, Noida, Uttar Pradesh 201309, India</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Spark Consultancy. All rights reserved.</p>
        <p>Smaller cohorts. Higher conviction. Better placements.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
