"use client";
import styles from "./styles.module.scss";
import ThreePage from "./assets/threePage";
import { IllustrationSection } from "./components/illustrationSection";
import IllustrationBlock1 from "./assets/IllustrationBlock1";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  return (
    <div id="main">
      <section className={styles.section}></section>
      <IllustrationSection />
      <section className={styles.section}>
        {/* <IllustrationSection></IllustrationSection> */}
      </section>
      <section className={styles.coinSection}>
        <div className={styles.sectionHalf}></div>
        <ThreePage></ThreePage>
      </section>
    </div>
  );
};
export default Page;
