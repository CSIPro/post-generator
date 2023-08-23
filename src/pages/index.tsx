import { Poppins } from "next/font/google";
import Link from "next/link";
import { FC, ReactNode } from "react";

import { FullNameEmphasis } from "@/components/ui/name-emphasis";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`bg-primary text-primary-foreground flex gap-6 min-h-screen flex-col items-center justify-center ${poppins.className}`}
    >
      <FullNameEmphasis>POST GENERATOR</FullNameEmphasis>
      <div className="grid grid-cols-2 gap-2">
        <h2 className="col-span-full text-center text-2xl">
          Selecciona el tipo de post que quieres generar
        </h2>
        <HomeScreenLink href="/flyer">Posters</HomeScreenLink>
        <HomeScreenLink href="#">Redes sociales</HomeScreenLink>
      </div>
    </main>
  );
}

interface LinkProps {
  href: string;
  children: ReactNode;
}

const HomeScreenLink: FC<LinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="bg-white text-primary text-lg block rounded-sm px-4 py-2 text-center transition-all hover:brightness-75"
    >
      {children}
    </Link>
  );
};
