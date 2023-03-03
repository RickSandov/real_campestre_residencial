import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast';

import '../styles/globals.scss';
import { Sidebar } from '../components/sidebar/Sidebar';

export default function App({ Component, pageProps, router }: AppProps) {

  const route = router.asPath;

  return (
    <>
      <Head>
        <title>Real Campestre Residencial</title>
        <meta name="description" content="Construye la casa de tus sueños en la zona con mayor plusvalía de Durango, Durango." />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="google-site-verification" content="7Ee6rABMfMaLv56qEsOc9Ys0gselMDJwMQ1M3-aOPRM" />
      </Head>
      {
        route.includes('/admin')
          ?
          <div className="container">
            <Sidebar />
            <div className="children">
              <Component {...pageProps} />
            </div>
          </div>
          :
          <Component {...pageProps} />
      }
      <Toaster
        toastOptions={{
          className: 'toast'
        }}
      />
    </>
  )
}