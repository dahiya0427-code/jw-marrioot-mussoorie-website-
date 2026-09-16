// TODO: migrate to Payload CMS fetch once DATABASE_URI is live
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentCard } from "@/components/ContentCard";
import { DEPARTMENTS } from "@/lib/departments";

export const metadata: Metadata = {
  title: "Departments | JW Marriott Mussoorie Walnut Grove Resort & Spa",
  description:
    "A behind-the-scenes look at the teams behind JW Marriott Mussoorie Walnut Grove Resort & Spa — Front Office, Food & Beverage, Spa & Wellness, Housekeeping, and Sales & Events.",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Behind the scenes"
        title="The teams behind every stay"
        subhead="A resort runs on the coordination of many teams working together. Here's a look at how Walnut Grove is organised, and what each team looks after."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department) => (
            <ContentCard
              key={department.slug}
              title={department.name}
              description={department.hook}
              href={`/departments/${department.slug}`}
              linkLabel="Meet the team"
              imageLabel={`${department.name} — photography pending`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
