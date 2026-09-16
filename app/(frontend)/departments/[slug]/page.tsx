// TODO: migrate to Payload CMS fetch once DATABASE_URI is live
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { DEPARTMENTS, getDepartment } from "@/lib/departments";

interface DepartmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DEPARTMENTS.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({
  params,
}: DepartmentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartment(slug);

  if (!department) {
    return { title: "Departments | JW Marriott Mussoorie Walnut Grove Resort & Spa" };
  }

  return {
    title: `${department.name} | JW Marriott Mussoorie Walnut Grove Resort & Spa`,
    description: department.hook,
  };
}

export default async function DepartmentDetailPage({
  params,
}: DepartmentDetailPageProps) {
  const { slug } = await params;
  const department = getDepartment(slug);

  if (!department) {
    notFound();
  }

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden sm:min-h-[50vh]">
        <ImagePlaceholder
          aspect="aspect-auto"
          variant="walnut"
          label={`${department.name} — photography pending`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/70 via-charcoal-ink/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-champagne-gold uppercase">
            Behind the scenes
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory-mist sm:text-5xl lg:text-6xl">
            {department.name}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-sans text-lg text-charcoal-ink">{department.overview}</p>

        <h2 className="mt-10 font-display text-2xl text-walnut-brown">
          What this team does for you
        </h2>
        <p className="mt-4 font-sans text-base text-charcoal-ink/80">
          {department.forGuests}
        </p>

        {department.relatedLinks.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-4">
            {department.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-semibold text-walnut-brown underline-offset-4 hover:underline"
              >
                {link.label} &rarr;
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
