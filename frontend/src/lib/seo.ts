// SEO Configuration and Metadata
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  schemaData?: Record<string, any>;
}

export const baseURL = "https://www.thesparkconsulting.in";

export const seoConfig = {
  home: {
    title: "Spark Consulting - Career Acceleration & Job Placement Services",
    description:
      "Spark Consulting offers career positioning, interview preparation, and mentorship-led job placements. 95% placement rate with 120+ partner companies. Join 5000+ successfully placed students.",
    keywords: [
      "spark consulting",
      "spark consultancy",
      "career consulting",
      "job placement",
      "placement consultancy",
      "interview preparation",
      "career acceleration",
      "consulting company",
      "mentorship",
      "recruitment services",
      "the spark consulting",
      "career guidance",
    ],
    ogTitle: "Spark Consulting - Career Acceleration Platform",
    ogDescription: "95% placement rate | 120+ partner companies | 5000+ students placed",
    ogUrl: baseURL,
  },
  about: {
    title: "About Spark Consulting - Mission & Values",
    description:
      "Learn about Spark Consulting's mission to accelerate careers. We provide career positioning, mentor-led preparation, and warm introductions to top companies across 12 countries.",
    keywords: [
      "about spark consulting",
      "spark team",
      "career acceleration platform",
      "mentorship program",
      "placement services",
      "recruitment consulting",
    ],
    ogTitle: "About Spark Consulting",
    ogUrl: `${baseURL}/about`,
  },
  contact: {
    title: "Contact Spark Consulting - Get Career Help",
    description:
      "Contact Spark Consulting for career consulting, job placement, and mentorship services. Reach out to our team today and start your career acceleration journey.",
    keywords: [
      "contact spark consulting",
      "career help",
      "placement services",
      "consulting contact",
      "career guidance services",
      "job placement contact",
    ],
    ogTitle: "Contact Us - Spark Consulting",
    ogDescription: "Get in touch with our career experts today",
    ogUrl: `${baseURL}/contact`,
  },
  partners: {
    title: "Our Partner Companies - Top Employers | Spark Consulting",
    description:
      "Spark Consulting partners with 120+ leading companies including Paytm, Amazon, McKinsey, Stripe and many more. Join our network of successful placements.",
    keywords: [
      "spark consulting partners",
      "partner companies",
      "recruitment partners",
      "paytm",
      "amazon",
      "mckinsey",
      "top employers",
      "consulting companies",
    ],
    ogTitle: "Partner Companies - Spark Consulting",
    ogUrl: `${baseURL}/ourpartners`,
  },
  admin: {
    title: "Admin Dashboard - Spark Consulting",
    description: "Admin portal for managing queries, companies, and student placements",
    keywords: ["admin dashboard", "spark consulting admin"],
  },
};

export const generateSchemaMarkup = (type: "organization" | "website" | "localBusiness") => {
  const baseSchema = {
    "@context": "https://schema.org",
    name: "Spark Consulting",
    url: baseURL,
    logo: `${baseURL}/logo.png`,
    description:
      "Career acceleration platform providing job placement, career consulting, and mentorship services",
    email: "operation@thesparkconsulting.in",
    telephone: "+91-XXXX-XXXX-XX",
    sameAs: [
      "https://www.linkedin.com/company/spark-consulting",
      "https://www.instagram.com/spark_consulting",
      "https://www.twitter.com/spark_consulting",
    ],
  };

  if (type === "organization") {
    return {
      ...baseSchema,
      "@type": "Organization",
      foundingDate: "2020",
      areaServed: ["IN", "US", "CA", "UK", "DE", "FR", "AU", "SG", "JP", "AE", "NZ", "IE"],
      knowsAbout: [
        "Career Consulting",
        "Job Placement",
        "Interview Preparation",
        "Resume Review",
        "Career Mentorship",
      ],
    };
  }

  if (type === "localBusiness") {
    return {
      ...baseSchema,
      "@type": "LocalBusiness",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "[Your Address]",
        addressLocality: "[City]",
        postalCode: "[Postal Code]",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    };
  }

  return {
    ...baseSchema,
    "@type": "WebSite",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseURL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

export const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Spark Consulting",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "250",
    bestRating: "5",
    worstRating: "1",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Spark Consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spark Consulting is a career acceleration platform that provides job placement services, career consulting, interview preparation, and mentorship to help professionals advance their careers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the placement rate at Spark Consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spark Consulting has a 95% placement rate with partnerships across 120+ leading companies worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact Spark Consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact us via our website contact form or email us at operation@thesparkconsulting.in",
      },
    },
  ],
};
