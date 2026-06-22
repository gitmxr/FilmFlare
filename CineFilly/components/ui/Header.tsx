import Image from "next/image";
import Link from "next/link";
import NavLinks from "@/components/ui/NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-black text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-3 md:flex-row">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/cinefilly_logo.webp"
            alt="CineFilly Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            priority
          />
          <span className="text-2xl font-bold text-red-600">
            <span className="text-white">Cine</span>Filly
          </span>
        </Link>

        <NavLinks />
      </div>
    </header>
  );
}
