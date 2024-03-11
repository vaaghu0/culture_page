"use client";
import styles from "./styles.module.scss";

import IllustrationSection from "./components/illustrationSection";
import FoundersSection from "./components/foundersSection";
import CoinSection from "./components/coinSection";
import TeamsSection from "./components/teamsSection";
import FirstSection from "./components/initialSection";
//gsap
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  console.log(navigator);
  return (
    <div id="main">
      {/* <FirstSection />
      <IllustrationSection /> */}
      {/* <FoundersSection /> */}
      {/* <section className={styles.section}></section> */}
      <CoinSection />
      {/* <TeamsSection /> */}
    </div>
  );
};
export default Page;
