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
      <section className="m-hero-bg px-4 py-16">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
              Anniversary experiences across South Africa
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{collection.title}</h1>
            <p className="mt-3 text-[var(--m-muted)]">{collection.description}</p>
            <p className="mt-2 text-sm text-[var(--m-muted)]">Region: {collection.region}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {collection.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--m-border)] px-3 py-1 text-xs text-[var(--m-muted)]">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/plan" className="m-btn-primary mt-8 inline-flex h-11 items-center rounded-full px-7 text-sm">
              Request this collection
            </Link>
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
