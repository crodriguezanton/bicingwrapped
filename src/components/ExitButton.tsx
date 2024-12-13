"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExitButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        localStorage.clear();
        router.push("/");
      }}
      className="flex flex-row items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80 md:text-base"
    >
      Sortir
      <XIcon className="h-4 w-4" />
    </button>
  );
}
