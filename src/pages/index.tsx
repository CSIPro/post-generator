import { Poppins } from "next/font/google";
import Link from "next/link";
import { FC, ReactNode } from "react";

import { FullNameEmphasis } from "@/components/ui/name-emphasis";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-6 bg-primary px-2 text-primary-foreground md:px-0 ${poppins.className}`}
    >
      <FullNameEmphasis>POST GENERATOR</FullNameEmphasis>
      <div className="grid w-full grid-cols-1 gap-2 px-2 md:w-2/3 md:grid-cols-2">
        <h2 className="col-span-full text-center text-base md:text-xl">
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
      className="block rounded-sm bg-white px-4 py-2 text-center text-lg text-primary transition-all hover:brightness-75"
    >
      {children}
    </Link>
  );
};
