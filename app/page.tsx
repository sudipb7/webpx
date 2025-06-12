import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { ImageCompressorForm } from "@/components/forms/image-compression";

export default function Home() {
  return (
    <>
      <header className="h-14 flex items-center justify-between container">
        <Link
          href="/"
          className="flex items-center justify-center font-mono font-bold"
          prefetch={false}
        >
          WebPx
          <span className="sr-only">WebPx - Image Compression Tool</span>
        </Link>
        <ModeToggle />
      </header>
      <main className="relative max-w-[1440px] mx-auto">
        <section className="container mx-auto py-12 md:py-24 lg:py-32">
          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center">
                  Compress your Images
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
                  Compress your images with the best quality and smallest size.
                </p>
              </div>
              <ImageCompressorForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex py-4 w-full items-center justify-center container">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          2025 © WebPx by
          <Link
            href="https://dub.co/sudip?ref=webpx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline transform"
          >
            @sudipbiswas
          </Link>
        </p>
      </footer>
    </>
  );
}
