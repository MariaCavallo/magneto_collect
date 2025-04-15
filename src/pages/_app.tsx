import { CartProvider } from "@/components/context/CartContext";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = router.pathname.includes("/login");

  return (
    <>
    <Head>
      <title>Magneto Collect</title>
    </Head>
    <HeroUIProvider navigate={router.push}>
      <CartProvider>
        {isAuthPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </CartProvider>
    </HeroUIProvider>
    </>
);
}
