import { Hero } from "./hero/Hero";
import { About } from "./about/About";
import { Services } from "./services/Services";
import { Galleries } from "./galleries/Galleries";
import { Info } from "./info/Info";
import { VisitUs } from "./visitUs/VisitUs";
import { FabIcons } from "components/fabs";
import { DividerLogo, Footer } from "components";
import { GoogleComments } from "./comments/GoogleComments";
import { Plan } from "./plan/Plan";
import { HomeLotsProvider } from "contexts";
import { GalleryFullScreen } from '../../galleryFullScreen/GalleryFullScreen';
import { useContext } from 'react';
import { GalleryContext } from 'contexts';
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const HomePage = () => {
  const { isFullScreen } = useContext(GalleryContext);
  const [ref] = useAutoAnimate<HTMLDivElement>()
  return (
    <>
      <Hero />
      <About />
      <Services />

      <Galleries />
      <div ref={ref}>
        {
          isFullScreen && <GalleryFullScreen />
        }
      </div>

      <Info />
      <DividerLogo />

      <HomeLotsProvider>
        <Plan />
        <VisitUs />
      </HomeLotsProvider>

      <GoogleComments />
      <Footer />

      <FabIcons />
    </>
  );
};
