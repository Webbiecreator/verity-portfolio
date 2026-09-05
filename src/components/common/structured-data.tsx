import { BASE_URL, OG_IMAGE } from "@/lib/constants";

export default function StructuredData() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Verity",
    url: BASE_URL,
    description:
      "Verity creates distinctive digital experiences through design, motion, and modern frontend development.",
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Verity",
    url: BASE_URL,
    logo: `${BASE_URL}/md-red-logo.svg`,
    image: OG_IMAGE,
    description:
      "A design and frontend studio creating distinctive digital experiences.",
    knowsAbout: [
      "Web Design",
      "Frontend Development",
      "Creative Development",
      "UI/UX Design",
      "Motion Design",
      "Next.js",
      "React",
      "TypeScript",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}
