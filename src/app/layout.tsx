import "@/styles/globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Fira_Mono, Poppins, Roboto } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";

import { ReactQueryProvider } from "@/context/react-query";
import { TemplateProvider } from "@/context/template-context";

import { ourFileRouter } from "./api/uploadthing/core";

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
        className={`font-sans text-white ${poppins.variable} ${fira.variable} ${roboto.variable}`}
      >
        <ReactQueryProvider>
          <TemplateProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
          </TemplateProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
