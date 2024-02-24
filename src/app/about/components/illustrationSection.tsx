import {
  useEffect,
  useRef,
  MutableRefObject,
  createRef,
  useState,
} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "../styles.module.scss";
import IllustrationBlock1 from "../assets/IllustrationBlock1";
import IllustrationBlock2 from "../assets/IllustrationBlock2";
import IllustrationBlock3 from "../assets/IllustrationBlock3";
import IllustrationBlock4 from "../assets/IllustrationBlock4";

gsap.registerPlugin(ScrollTrigger);

export const IllustrationSection = () => {
  const illustrationSectionRef = useRef(null);
  const illustrationBlock1 = useRef(null);
  const illustrationBlock2 = useRef(null);
  const illustrationBlock3 = useRef(null);
  const illustrationBlock4 = useRef(null);
  const block1 = useRef(null);
  const block2 = useRef(null);
  const block3 = useRef(null);
  const block4 = useRef(null);
  const illustrationDelay = 4;
  const illustationTimeline = (
    illustation: MutableRefObject<any>
  ): gsap.core.Timeline => {
    console.log(
      illustation.current.offsetLeft / illustation.current.offsetWidth,
      illustation.current
    );
    return gsap
      .timeline()
      .to(illustation.current, {
        ease: "sine",
        x:
          -illustation.current.offsetWidth *
          Math.floor(
            illustation.current.offsetLeft / illustation.current.offsetWidth
          ),
        duration: 7,
      })
      .to(illustation.current, {
        ease: "sine",
        x:
          -illustation.current.offsetWidth *
          (Math.floor(
            illustation.current.offsetLeft / illustation.current.offsetWidth
          ) +
            1),
        delay: illustrationDelay,
        durationPer: 5,
        opacity: 0.5,
      });
  };
  const BlockTimeline = (
    block: MutableRefObject<null>,
    IllustrationBlock: gsap.core.Timeline
  ): gsap.core.Timeline => {
    return gsap
      .timeline()
      .set(block.current, {
        y: "100dvh",
        opacity: 0,
      })
      .from(block.current, {
        duration: 5,
        y: "100dvh",
        opacity: 0,
      })
      .add(IllustrationBlock, "<")
      .to(block.current, {
        delay: 3,
        duration: 5,
        y: "-100dvh",
        opacity: 0,
      });
  };
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
      t1.add(illustationTimeline(illustrationBlock1), illustrationDelay * 0);
      t1.add(illustationTimeline(illustrationBlock2), illustrationDelay * 2.5);
      t1.add(illustationTimeline(illustrationBlock3), illustrationDelay * 4.5);
      t1.add(illustationTimeline(illustrationBlock4), illustrationDelay * 6.5);
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      className={styles.coinSection}
      ref={illustrationSectionRef}
      id="section">
      <div className={styles.sectionHalfIllustration}>
        <div
          className={styles.IllustrationBlock}
          id="illustration1"
          ref={illustrationBlock1}>
          <IllustrationBlock1 width="40dvw" height="40dvh" />
        </div>
        <div
          className={styles.IllustrationBlock}
          id="illustration2"
          ref={illustrationBlock2}>
          <IllustrationBlock2 width="40dvw" height="40dvh" />
        </div>
        <div
          className={styles.IllustrationBlock}
          id="illustration3"
          ref={illustrationBlock3}>
          <IllustrationBlock3 width="40dvw" height="40dvh" />
        </div>
        <div
          className={styles.IllustrationBlock}
          id="illustration4"
          ref={illustrationBlock4}>
          <IllustrationBlock4 width="40dvw" height="40dvh" />
        </div>
      </div>
      <div className={styles.sectionHalfText}>
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
        <div className={styles.block} ref={block4} id="block4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis beatae
          deserunt sit quo voluptate fugit dolorum aspernatur numquam eum
          voluptatibus repellat iure modi in ratione tenetur natus, ipsa magni
          qui inventore accusamus architecto mollitia amet cumque? Sint vero,
          doloremque tempore, obcaecati quidem illum consequatur harum doloribus
          iure laudantium, dolores porro?
        </div>
      </div>
    </section>
  );
};
