import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Montserrat:wght@200,400;600;700&family=Poppins:wght@200&display=swap;" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}


// isr 1%

// actividad empresarial ingresos - gastos 