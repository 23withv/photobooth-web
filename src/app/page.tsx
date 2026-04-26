import { BoothContainer } from "@/components/booth/boothContainer";
import { ModeToggle } from "@/components/shared/modeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <header className="mb-8 flex w-full max-w-5xl items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">VibeSnap</h1>
        <ModeToggle />
      </header>

      <section className="w-full max-w-4xl">
        <BoothContainer />
      </section>
    </main>
  );
}