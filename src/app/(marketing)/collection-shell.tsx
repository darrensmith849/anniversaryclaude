import Image from "next/image";
import Link from "next/link";
import { collectionsMetadata } from "@/config/concierge";
import { PhotoCard } from "@/components/marketing/home/PhotoCard";

const collectionGallery: Record<string, { src: string; alt: string }[]> = {
  "safari-anniversary": [
    { src: "/images/sa/kruger-safari.jpg", alt: "Safari wildlife scene" },
    { src: "/images/sa/luxury-hotel-interior.jpg", alt: "Luxury lodge interior detail" },
    { src: "/images/sa/drakensberg-mountains.jpg", alt: "Mountain backdrop near reserve routes" },
  ],
  "winelands-anniversary": [
    { src: "/images/sa/winelands-vineyards.jpg", alt: "Vineyard rows and valley views" },
    { src: "/images/sa/luxury-hotel-interior.jpg", alt: "Estate suite interior styling" },
    { src: "/images/sa/cape-town-table-mountain.jpg", alt: "Western Cape scenic backdrop" },
  ],
  "coastal-luxury-anniversary": [
    { src: "/images/sa/garden-route-coastal.jpg", alt: "Garden Route cliffs and ocean" },
    { src: "/images/sa/luxury-hotel-interior.jpg", alt: "Coastal hotel suite interior" },
    { src: "/images/sa/cape-town-table-mountain.jpg", alt: "Coastal city horizon view" },
  ],
  "city-anniversary": [
    { src: "/images/sa/cape-town-table-mountain.jpg", alt: "Cape Town skyline with mountain backdrop" },
    { src: "/images/sa/luxury-hotel-interior.jpg", alt: "City suite interior styling" },
    { src: "/images/sa/winelands-vineyards.jpg", alt: "Nearby wine-region day route" },
  ],
  "adventure-romance": [
    { src: "/images/sa/drakensberg-mountains.jpg", alt: "Drakensberg peaks and trail views" },
    { src: "/images/sa/garden-route-coastal.jpg", alt: "Adventure coastline outlook" },
    { src: "/images/sa/luxury-hotel-interior.jpg", alt: "Luxury basecamp interior detail" },
  ],
};

export function CollectionShell({ slug }: { slug: string }) {
  const collection = collectionsMetadata.find((item) => item.slug === slug);
  if (!collection) {
    return null;
  }

  const gallery = collectionGallery[slug] ?? [];

  return (
    <div className="flex flex-col">
      <section className="px-4 py-16 md:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="m-overline">Anniversary Collection</p>
            <h1 className="m-display text-5xl leading-[0.98] text-[var(--m-text)] md:text-6xl">{collection.title}</h1>
            <p className="max-w-xl text-[var(--m-text-muted)]">{collection.description}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--m-text-muted)]">Region: {collection.region}</p>
            <div className="flex flex-wrap gap-2">
              {collection.tags.map((tag) => (
                <span key={tag} className="m-chip px-3 py-2 text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/plan" className="m-btn-primary">
                Request This Collection
              </Link>
              <Link href="/" className="m-btn-glass">
                Back Home
              </Link>
            </div>
          </div>
          <PhotoCard>
            <div className="home-boxed-panel relative aspect-[4/3] overflow-hidden">
              <Image src={collection.imageSrc} alt={collection.imageAlt} fill className="object-cover" />
              <div className="m-img-overlay absolute inset-0" />
            </div>
          </PhotoCard>
        </div>
      </section>

      <section className="m-section px-4 pt-0">
        <div className="container">
          <div className="home-boxed-panel p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="m-overline">Gallery</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--m-text-muted)]">Featured moments</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {gallery.map((image) => (
                <PhotoCard key={image.src}>
                  <div className="relative min-h-[11rem] overflow-hidden rounded-sm border border-[var(--m-border)]">
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                    <div className="m-img-overlay absolute inset-0" />
                  </div>
                </PhotoCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
