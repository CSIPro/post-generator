import "@/styles/globals.css";
import { Fira_Mono, Poppins, Roboto } from "next/font/google";

import { PosterContextProvider } from "@/context/poster";
import { ReactQueryProvider } from "@/context/react-query";
import { TemplateProvider } from "@/context/template-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});
const fira = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`flex min-h-screen flex-col items-center justify-between font-sans text-white ${poppins.variable} ${fira.variable} ${roboto.variable}`}
      >
        <ReactQueryProvider>
          <TemplateProvider>
            <PosterContextProvider>{children}</PosterContextProvider>
          </TemplateProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
