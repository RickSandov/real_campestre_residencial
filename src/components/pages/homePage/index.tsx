import { Hero } from "./hero/Hero";
import { About } from "./about/About";
import { Services } from "./services/Services";
import { Galleries } from "./galleries/Galleries";
import { Info } from "./info/Info";
import { DividerLogo } from "components";
import { VisitUs } from "./visitUs/VisitUs";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Galleries />
      <Info />
      <DividerLogo />
      <VisitUs />
    </>
  );
};
