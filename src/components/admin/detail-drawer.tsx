import Link from "next/link";

export function DetailDrawer({
  title,
  description,
  open,
  closeHref,
  children,
}: {
  title: string;
  description?: string;
  open: boolean;
  closeHref: string;
  children: React.ReactNode;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <Link href={closeHref} className="flex-1 bg-black/20 backdrop-blur-[1px]" aria-label="Close drawer" />
      <aside className="h-full w-full max-w-xl overflow-y-auto border-l bg-background p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <Link href={closeHref} className="text-sm text-muted-foreground hover:text-foreground">
            Close
          </Link>
        </div>
        {children}
      </aside>
    </div>
  );
}
