import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { PosterContextProvider } from "@/context/poster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PosterContextProvider>
      <Component {...pageProps} />
    </PosterContextProvider>
  );
}
