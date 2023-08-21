import { Poppins } from "next/font/google";

import { PostGenerator } from "@/components/post-generator/post-generator";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${poppins.className}`}
    >
      <PostGenerator />
    </main>
  );
}
