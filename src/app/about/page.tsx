"use client";
import styles from "./styles.module.scss";
import ThreePage from "./assets/threePage";
import { IllustrationSection } from "./components/illustrationSection";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const mainRef = useRef(null);
  const illustrationSectionRef = useRef(null);
  const block1 = useRef(null);
  const block2 = useRef(null);
  const block3 = useRef(null);
  const block4 = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#section",
          pin: "#section",
          markers: true,
          scrub: true,
          start: "top top",
          // end: "bottom center",
        },
      });
      t1.to("#block1", {
        rotateX: 360,
        x: 300,
      }).to("#block2", {
        rotateY: 2000,
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={mainRef} id="main">
      <section className={styles.section}></section>
      <section
        className={styles.coinSection}
        ref={illustrationSectionRef}
        id="section">
        <div className={styles.block} ref={block1} id="block1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          deleniti reprehenderit ratione minus cupiditate, praesentium beatae
          numquam. Veritatis fugit tempore ab, autem sapiente hic. Explicabo
          quidem possimus fugiat earum commodi et, corporis ullam iusto nihil.
          Sint tempora aperiam maiores quas vel architecto laudantium quos neque
          cumque odio, ducimus qui quia.
        </div>
        <div className={styles.block} ref={block2} id="block2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          maiores dolore, saepe fugiat enim quis non dicta deserunt blanditiis
          necessitatibus aut harum beatae eius velit natus? Delectus fugit
          inventore tempora culpa doloremque cumque natus quas est commodi
          veniam nisi accusantium dolor animi autem facilis ad esse,
          necessitatibus magni laboriosam earum?
        </div>
        <div className={styles.block} ref={block3} id="block3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam omnis
          sint perspiciatis veniam culpa consectetur saepe? Quaerat dolorem
          perspiciatis reprehenderit dolores dicta minima. Blanditiis aliquid
          tenetur corrupti debitis soluta culpa eveniet. Architecto id eum,
          explicabo ea voluptates dicta corporis dolorem quidem at nam tenetur
          fuga consequuntur expedita aut magni odit.
        </div>
        <div className={styles.block} ref={block4}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis beatae
          deserunt sit quo voluptate fugit dolorum aspernatur numquam eum
          voluptatibus repellat iure modi in ratione tenetur natus, ipsa magni
          qui inventore accusamus architecto mollitia amet cumque? Sint vero,
          doloremque tempore, obcaecati quidem illum consequatur harum doloribus
          iure laudantium, dolores porro?
        </div>
      </section>
      <section className={styles.coinSection}>
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
