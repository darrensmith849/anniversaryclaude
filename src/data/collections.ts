import { budgetBands, collectionsMetadata } from "@/config/concierge";

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  region: string;
  vibe: string;
  budget: string;
  tags: string[];
};

export const collections: Collection[] = collectionsMetadata.map((item) => ({
  slug: item.slug,
  title: item.title,
  subtitle: item.subtitle,
  description: item.description,
  href: item.href,
  imageSrc: item.imageSrc,
  imageAlt: item.imageAlt,
  region: item.region,
  vibe: item.vibe.toLowerCase(),
  budget: "signature",
  tags: item.tags,
}));

export { budgetBands };
