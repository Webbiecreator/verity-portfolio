import { BASE_URL, OG_IMAGE } from "@/lib/constants";

export default function StructuredData() {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Verity",
    url: BASE_URL,
    image: OG_IMAGE,
    description:
      "Designer and developer creating distinctive digital experiences through interface design, motion, and modern frontend development.",
    jobTitle: "Designer & Developer",
    knowsAbout: [
      "Interface Design",
      "Motion Design",
      "Interaction Design",
      "Design Systems",
      "Frontend Development",
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "WebGL",
      "Typography",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Verity — Digital Experiences",
    url: BASE_URL,
    description:
      "Verity creates distinctive digital experiences through design, motion, and modern frontend development.",
    author: {
      "@type": "Person",
      name: "Verity",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
    </>
  );
}
