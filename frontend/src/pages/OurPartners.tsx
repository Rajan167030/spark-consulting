import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { apiRequest } from "@/lib/api";
import { seoConfig, baseURL } from "@/lib/seo";
import paytmLogo from "@/assets/paytm.png";
import screenshotOne from "@/assets/Screenshot 2026-04-05 163639.png";
import screenshotTwo from "@/assets/Screenshot 2026-04-05 163704.png";
import screenshotThree from "@/assets/Screenshot 2026-04-05 163723.png";
import screenshotFour from "@/assets/Screenshot 2026-04-05 163750.png";

const ease = [0.19, 1, 0.22, 1] as const;

const partnerScreenshots  = [
  {
    id: "partner-shot-1",
    image: screenshotOne,
    className: "w-full",
  },
  {
    id: "partner-shot-2",
    image: screenshotTwo,
    className: "w-full",
  },
  {
    id: "partner-shot-3",
    image: screenshotThree,
    className: "w-full",
  },
  {
    id: "partner-shot-4",
    image: screenshotFour,
    className: "mx-auto w-[78%]",
  },
];

type Company = {
  _id: string;
  name: string;
  logo: string;
};

const OurPartners = () => {
  const [partners, setPartners] = useState<Company[]>([
    {
      _id: "paytm",
      name: "Paytm",
      logo: paytmLogo,
    },
  ]);

  // Fetch companies from API
  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await apiRequest("/company/getcompany");
        if (Array.isArray(data) && data.length > 0) {
          // Combine API companies with the default Paytm company
          const allCompanies = [...data, 
            {
              _id: "paytm",
              name: "Paytm",
              logo: paytmLogo,
            }
          ];
          setPartners(allCompanies);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        // Keep default if API fails
      }
    }
    fetchCompanies();
  }, []);
  return (
    <>
      <SEOHead
        {...seoConfig.partners}
        canonicalUrl={`${baseURL}/ourpartners`}
      />
      <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-4xl"
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Our Partners
          </span>
          <h1 className="font-display text-5xl tracking-tight md:text-7xl">
            Companies that trust Spark talent.
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
            Our client partners span fast-growing hiring teams, operations-led businesses,
            and established brands looking for high-conviction candidates.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.55, ease }}
              className="flex min-h-[120px] items-center justify-center px-6 py-6"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 w-full object-contain opacity-90 transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-10">  
          
            
            
         

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {partnerScreenshots.map((shot, index) => (
              <motion.div
                key={shot.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55, ease }}
                className="mx-auto flex w-full max-w-[420px] items-center justify-center"
              >
                <img
                  src={shot.image}
                  alt={`Partner screenshot ${index + 1}`}
                  className={`h-auto object-contain ${shot.className}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default OurPartners;
