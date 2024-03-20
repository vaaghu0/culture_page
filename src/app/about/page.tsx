"use client";
import styles from "./styles.module.scss";

import IllustrationSection from "./components/illustrationSection";
import FoundersSection from "./components/foundersSection";
import CoinSection from "./components/coinSection";
import TeamsSection from "./components/teamsSection";
import FirstSection from "./components/initialSection";
import EndSection from "./components/endSection";

//gsap
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  return (
    <>
      <FirstSection />
      <IllustrationSection />
      <CoinSection />
      <TeamsSection />
      <FoundersSection />
      <EndSection />
    </>
  );
};
export default Page;
