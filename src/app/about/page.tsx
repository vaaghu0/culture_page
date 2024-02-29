"use client";
import styles from "./styles.module.scss";
import ThreePage from "./assets/threePage";

import IllustrationSection from "./components/illustrationSection";
import FoundersSection from "./components/foundersSection";
import CoinSection from "./components/coinSection";
//gsap
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  return (
    <div id="main">
      {/* <section className={styles.section}></section> */}
      {/* <IllustrationSection />
      <FoundersSection /> */}
      <CoinSection />
      <section className={styles.coinSection}>
        <div className={styles.sectionHalf}></div>
        <ThreePage></ThreePage>
      </section>
    </div>
  );
};
export default Page;
