import Link from "next/link";
import { FC, ReactNode } from "react";

import { FullNameEmphasis } from "@/components/ui/name-emphasis";

export default function Page() {
  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-primary px-2 text-primary-foreground md:px-0`}
    >
      <FullNameEmphasis>POST GENERATOR</FullNameEmphasis>
      <div className="grid w-full grid-cols-1 gap-2 px-2 md:w-1/3">
        {/* <h2 className="col-span-full text-center text-base md:text-xl">
          Selecciona el tipo de post que quieres generar
        </h2> */}
        <HomeScreenLink href="/select-template">Iniciar</HomeScreenLink>
      </div>
    </div>
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
      className="block rounded-sm bg-white px-4 py-2 text-center text-lg font-bold uppercase tracking-wider text-primary transition-all hover:bg-accent hover:text-xl hover:text-white"
    >
      {children}
    </Link>
  );
};
