import Head from 'next/head'
import { HomePage } from 'components/pages'
import { GalleryProvider } from 'contexts'

const title = 'Construye la casa de tus sueños en la zona con mayor plusvalía de la Durango, Durango.';
const description = 'Los mejores terrenos de Durango, ubicados en la zona con mayor pluslvalía de la ciudad.';

export default function Home() {
  return (
    <>
      <Head>
        <title>Real Campestre Residencial</title>
        <meta name="description" content={title} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://metatags.io/" /> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.realcampestredgo.com/assets/hero.png" />

        <meta property="twitter:card" content="summary_large_image" />
        {/* <meta property="twitter:url" content="https://metatags.io/" /> */}
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://www.realcampestredgo.com/assets/hero.png" />

      </Head>

      <GalleryProvider>
        <HomePage />
      </GalleryProvider>
    </>
  )
}
