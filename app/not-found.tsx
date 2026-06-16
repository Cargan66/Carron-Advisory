import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-emerald-radial px-6 text-center">
      <div className="max-w-md">
        <p className="text-7xl font-bold text-gold-gradient">404</p>
        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
          This page doesn&apos;t add up.
        </h1>
        <p className="mt-4 leading-relaxed text-bone/90">
          The page you&apos;re looking for can&apos;t be found. Let&apos;s get
          you back to solid ground.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            Return Home
          </Button>
        </div>
      </div>
    </section>
  );
}
