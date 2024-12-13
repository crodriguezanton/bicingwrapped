import Dashboard from "~/components/summary/dashboard";
import Image from "next/image";

export default function ResultPage() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-black/50 backdrop-blur-md">
        <Dashboard />
      </div>
      <div className="fixed inset-0 -z-10 h-screen w-full">
        <Image
          src="/background.jpg"
          alt="Cyclist in Barcelona"
          className="object-cover"
          fill
          priority
        />
      </div>
    </>
  );
}
