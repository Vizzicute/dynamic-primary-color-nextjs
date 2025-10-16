import ThemeCustomizer from "@/components/theme-customizer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-8 p-8 bg-gradient-to-br from-background via-primary/20 to-background">
      <section className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
          Dynamic Primary Color System
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          A lightweight Next.js demo that showcases dynamic theming using CSS
          custom properties and Tailwind. Change the primary color live and see
          the components update instantly — no rebuild required.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ThemeCustomizer />

          <Button variant={"default"} className="bg-primary px-5 py-2 rounded-lg shadow">
            Example Button
          </Button>
        </div>
      </section>

      <section className="max-w-4xl w-full">
        <h2 className="text-2xl font-bold mt-8">What this project demonstrates</h2>

        <ul className="list-disc pl-6 mt-3 space-y-2 text-base text-muted-foreground">
          <li>Dynamic theming with CSS variables integrated into Tailwind utilities.</li>
          <li>A theme provider and hooks to persist and apply a user&apos;s chosen color.</li>
          <li>How UI components can automatically adopt a project&apos;s primary color.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6">How to run locally</h2>

        <ol className="list-decimal pl-6 mt-3 text-base text-muted-foreground">
          <li>Install dependencies: <code>npm install</code></li>
          <li>Run the dev server: <code>npm run dev</code></li>
          <li>Open <code>http://localhost:3000</code> in your browser</li>
        </ol>

        <h2 className="text-2xl font-bold mt-6">About the developer</h2>

        <p className="mt-2 text-base text-muted-foreground">
          Built by <strong>Vic Octavian</strong>, a self-taught software developer.
          Vic created this project to demonstrate practical techniques for
          runtime theme customization in modern React and Next.js apps.
        </p>

        <h2 className="text-2xl font-bold mt-6">Notes & contributing</h2>

        <p className="mt-2 text-base text-muted-foreground">
          The repository is intended as an educational example. Feel free to
          explore the source, adapt the approach for your projects, or open an
          issue if you have suggestions.
        </p>
      </section>
    </main>
  );
}
