import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory-mist px-6 text-center">
      <p className="font-sans text-sm tracking-[0.2em] text-soft-grey uppercase">
        Coming soon
      </p>
      <h1 className="font-display text-4xl text-walnut-brown sm:text-5xl">
        JW Marriott Mussoorie
        <br />
        Walnut Grove Resort &amp; Spa
      </h1>
      <p className="max-w-xl font-sans text-base text-charcoal-ink">
        The technical foundation for this site is being built. Content and
        booking experiences arrive in the next phase.
      </p>
      <Button variant="primary">Enquire Now</Button>
    </main>
  );
}
