import { AnimatedGradientBackground } from "~/components/AnimatedGradientBackground";
import Dashboard from "~/components/summary/dashboard";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import ExitButton from "~/components/ExitButton";

export default function ResultPage() {
  return (
    <AnimatedGradientBackground>
      <div className="container mx-auto space-y-4 px-4 py-8 md:px-8">
        <header className="flex items-center justify-center pb-8">
          <h1 className="text-center text-4xl font-black tracking-tighter">
            <Image
              src="/logo.svg"
              alt="Bicing Logo"
              className="inline"
              width={100}
              height={100}
            />{" "}
            WRAPPED 2024
          </h1>
        </header>
        <nav className="flex flex-row items-center justify-between gap-2">
          <Link
            href="/stories"
            className="flex flex-row items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80 md:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Tornar a les stories
          </Link>
          <ExitButton />
        </nav>
        <Dashboard />
        <footer className="flex flex-col gap-4 pt-4">
          <div className="flex flex-row justify-center">
            <div className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-background/60 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-background/80">
              <div className="flex flex-row items-center gap-4">
                <Image
                  src="/metru.png"
                  alt="Metru Logo"
                  className="rounded-xl"
                  width={80}
                  height={80}
                />
                <div className="flex flex-col gap-2">
                  <p>
                    Aprofito l&apos;avinentesa per fer una petita falca
                    d&apos;un projecte en què he estat treballant fa un temps.
                  </p>
                  <p>
                    Es diu <b>Metru.cat</b> i és una aplicació que et permet
                    veure els propers trens de la xarxa ferroviària de Catalunya
                    d&apos;una forma molt senzilla. Ja està disponible a
                    dispositius iOS i en versió web (molt aviat també per a
                    Android).
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <Link
                  href="https://metru.cat"
                  className="rounded-full border border-border bg-background/60 px-6 py-2 font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                >
                  Web
                </Link>
                <Link
                  href="https://apps.apple.com/app/apple-store/id6474214657?pt=125972329&ct=Bicing%20Wrapped&mt=8"
                  className="rounded-full border border-border bg-background/60 px-6 py-2 font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                >
                  iOS
                </Link>
                <Link
                  href="https://feedback.metru.cat/p/aplicacio-per-dispositius-android"
                  className="rounded-full border border-border bg-background/60 px-6 py-2 font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                >
                  Android
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <Link
              href="https://twitter.com/crodriguezanton"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-background/60 px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80 md:text-base"
            >
              Fet amb ❤️ per{" "}
              <span className="font-semibold">@crodriguezanton</span>
            </Link>
            <Link
              href="https://github.com/crodriguezanton/bicingwrapped"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-background/60 px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80 md:text-base"
            >
              <span className="hidden md:inline">Codi font a </span>GitHub
            </Link>
          </div>
        </footer>
      </div>
    </AnimatedGradientBackground>
  );
}
