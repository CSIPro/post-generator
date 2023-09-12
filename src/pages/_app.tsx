/* eslint-disable check-file/filename-naming-convention */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fira_Mono, Poppins, Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { PosterContextProvider } from "@/context/poster";
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

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TemplateProvider>
        <PosterContextProvider>
          <main
            className={`flex min-h-screen flex-col items-center justify-between font-sans text-white ${poppins.variable} ${fira.variable} ${roboto.variable}`}
          >
            <Component {...pageProps} />
          </main>
        </PosterContextProvider>
      </TemplateProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
