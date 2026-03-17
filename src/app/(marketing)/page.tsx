import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center md:py-32">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Unforgettable Anniversaries,{" "}
          <span className="text-primary">Effortlessly Planned</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Bespoke luxury anniversary experiences across South Africa. From
          vineyard escapes in Franschhoek to safari sunsets in the Kruger — we
          handle every detail so you can focus on each other.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/plan">Start Planning</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t bg-muted/40 px-4 py-16 md:py-24"
      >
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell Us Your Story",
                desc: "Share your preferences, dates, and dream vibe. We listen to every detail.",
              },
              {
                step: "2",
                title: "We Curate & Propose",
                desc: "Our concierge team designs a bespoke itinerary with handpicked partners.",
              },
              {
                step: "3",
                title: "Celebrate & Enjoy",
                desc: "Arrive to a seamless experience. Every moment crafted, every detail covered.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center md:py-24">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Ready to Create Something Special?
        </h2>
        <p className="mb-8 text-muted-foreground">
          Let&apos;s start planning your perfect anniversary.
        </p>
        <Button asChild size="lg">
          <Link href="/plan">Plan Your Anniversary</Link>
        </Button>
      </section>
    </div>
  );
}
