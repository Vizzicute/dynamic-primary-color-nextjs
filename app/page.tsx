import ThemeCustomizer from "@/components/theme-customizer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-6">
      <h1 className="text-3xl font-bold text-primary">
        Dynamic Primary Color System
      </h1>

      <ThemeCustomizer/>

      <Button
        variant={"default"}
        className="bg-primary px-5 py-2 rounded-lg shadow"
      >
        Example Button
      </Button>
    </main>
  );
}
