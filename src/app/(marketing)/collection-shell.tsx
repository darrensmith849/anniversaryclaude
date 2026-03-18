import Image from "next/image";
import Link from "next/link";
import { collectionsMetadata } from "@/config/concierge";

export function CollectionShell({ slug }: { slug: string }) {
  const collection = collectionsMetadata.find((item) => item.slug === slug);
  if (!collection) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <section className="m-hero-bg px-4 py-20 md:py-24">
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
          <div className="m-card relative aspect-[4/3] overflow-hidden">
            <Image src={collection.imageSrc} alt={collection.imageAlt} fill className="object-cover" />
            <div className="m-img-overlay absolute inset-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
