"use client";
import styles from "./styles.module.scss";
import ThreePage from "./assets/threePage";
import IllustrationBlock1 from "./assets/IllustrationBlock1";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IllustrationSection from "./components/illustrationSection";
import FoundersSection from "./components/foundersSection";
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  return (
    <div id="main">
      <section className={styles.section}></section>
      <IllustrationSection />
      <FoundersSection />
      <section className={styles.coinSection}>
        <div className={styles.sectionHalf}></div>
        <ThreePage></ThreePage>
      </section>
    </div>
  );
};
export default Page;
