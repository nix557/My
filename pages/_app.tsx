import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#111827" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Nixon Assistant</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}