import Head from 'next/head'
import Image from 'next/image'
import { HomePage } from 'components/pages'
import { GalleryProvider } from 'contexts'

export default function Home() {
  return (
    <GalleryProvider>
      <HomePage />
    </GalleryProvider>
  )
}
