import Image from "next/image";
import Link from "next/link";
import { collectionsMetadata, marketingCopy } from "@/config/concierge";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="m-hero-bg px-4 py-20 md:py-28">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--m-accent)]">
              {marketingCopy.heroEyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {marketingCopy.heroTitle}
            </h1>
            <p className="text-[var(--m-muted)] md:text-lg">{marketingCopy.heroDescription}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/plan" className="m-btn-primary inline-flex h-11 items-center rounded-full px-7 text-sm">
                Start planning
              </Link>
              <Link href="/winelands-anniversary" className="m-btn-glass inline-flex h-11 items-center rounded-full px-7 text-sm font-medium">
                View collections
              </Link>
            </div>
          </div>
          <div className="m-card relative hidden aspect-[4/3] overflow-hidden lg:block">
            <Image
              src={collectionsMetadata[1].imageSrc}
              alt={collectionsMetadata[1].imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="m-img-overlay absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white">
              <p className="text-xs uppercase tracking-widest text-white/80">Curated anniversary escapes</p>
              <p className="mt-1 text-lg font-semibold">{collectionsMetadata[1].title}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="m-divider" />

      <section className="px-4 py-16">
        <div className="container space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">{marketingCopy.collectionsTitle}</h2>
            <p className="mt-2 text-[var(--m-muted)]">{marketingCopy.collectionsDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collectionsMetadata.map((item) => (
              <Link key={item.slug} href={item.href} className="m-card group">
                <div className="m-img-overlay relative aspect-[16/10]">
                  <Image src={item.imageSrc} alt={item.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white">
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm text-white/70">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      <section className="bg-[var(--m-dark)] px-4 py-16 text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white">{marketingCopy.ctaTitle}</h2>
          <p className="mt-3 text-white/70">{marketingCopy.ctaDescription}</p>
          <Link href="/plan" className="m-btn-primary mt-8 inline-flex h-11 items-center rounded-full px-8 text-sm">
            Begin your brief
          </Link>
        </div>
      </section>
    </div>
  );
}
