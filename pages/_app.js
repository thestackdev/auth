import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
