import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Real Campestre Residencial</title>
        <meta name="description" content="Construye la casa de tus sueños en la zona con mayor plusvalía de la Durango, Durango." />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}