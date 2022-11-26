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

export const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Galleries />
      <Info />
      <DividerLogo />
      <Plan />
      <VisitUs />
      <GoogleComments />
      <Footer />

      <FabIcons />
    </>
  );
};
