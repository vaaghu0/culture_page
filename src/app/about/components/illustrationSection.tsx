import {
  useEffect,
  useRef,
  MutableRefObject,
  createRef,
  useState,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "../styles.module.scss";
import IllustrationBlock1 from "../assets/IllustrationBlock1";
import IllustrationBlock2 from "../assets/IllustrationBlock2";
import IllustrationBlock3 from "../assets/IllustrationBlock3";
import IllustrationBlock4 from "../assets/IllustrationBlock4";
import { time } from "console";

gsap.registerPlugin(ScrollTrigger);

export const IllustrationSection = () => {
  const sectionRef: MutableRefObject<any> = useRef();
  const illustationSectionRef: MutableRefObject<any> = useRef(null);
  const illustrationBlock1: MutableRefObject<any> = useRef(null);
  const illustrationBlock2 = useRef(null);
  const illustrationBlock3 = useRef(null);
  const illustrationBlock4 = useRef(null);
  const block1: MutableRefObject<any> = useRef(null);
  const block2: MutableRefObject<any> = useRef(null);
  const block3: MutableRefObject<any> = useRef(null);
  const block4: MutableRefObject<any> = useRef(null);
  const illustrationDelay = 4;
  const illustationTimeline = (count?: number): gsap.core.Timeline => {
    let panels = gsap.utils.toArray(".panel");

    return gsap.timeline().to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      duration: 10,

      scrollTrigger: {
        trigger: sectionRef.current,
        pin: sectionRef.current,
        start: "top top",
        scrub: true,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 1,
          delay: 0,
          ease: "expo",
        },
        // end: () => "+=" + sectionRef.current.offsetWidth,
        // markers: true,
      },
    });
  };
  const textTimeline = (): gsap.core.Timeline => {
    let panels = gsap.utils.toArray(".textPanel");

    return gsap.timeline().to(panels, {
      yPercent: -100 * (panels.length - 1),
      ease: "none",
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        // pin: sectionRef.current,
        start: "top top",
        scrub: true,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 1,
          ease: "expo",
        },
        // end: () => "+=" + sectionRef.current.offsetWidth,
        // markers: true,
      },
    });
  };
  const BlockTimeline = (block: MutableRefObject<null>): gsap.core.Timeline => {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      })
      .set(block.current, {
        y: "100vh",
        opacity: 0,
      })
      .from(block.current, {
        duration: 5,
        y: "100vh",
        opacity: 0,
      })
      .to(block.current, {
        delay: 3,
        duration: 5,
        y: "-100vh",
        opacity: 0,
      });
  };
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.add(illustationTimeline());
      // timeline.add(illustationTimeline(3, BlockTimeline(block1)));
      textTimeline();
    }, sectionRef);
    return () => ctx.revert();
  });
  return (
    <section
      className={styles.IllustrationSection}
      ref={sectionRef}
      id="section">
      <div
        className={styles.sectionHalfIllustration}
        ref={illustationSectionRef}>
        <div
          className={styles.IllustrationBlock + " panel"}
          id="illustration1"
          ref={illustrationBlock1}>
          <IllustrationBlock1 width="350px" height="350px" />
        </div>
        <div
          className={styles.IllustrationBlock + " panel"}
          id="illustration2"
          ref={illustrationBlock2}>
          <IllustrationBlock2 width="350px" height="350px" />
        </div>
        <div
          className={styles.IllustrationBlock + " panel"}
          id="illustration3"
          ref={illustrationBlock3}>
          <IllustrationBlock3 width="350px" height="350px" />
        </div>
        <div
          className={styles.IllustrationBlock + " panel"}
          id="illustration4"
          ref={illustrationBlock4}>
          <IllustrationBlock4 width="350px" height="350px" />
        </div>
      </div>
      <div className={styles.sectionHalfText}>
        <div className={styles.block + " textPanel"} ref={block1} id="block1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          deleniti reprehenderit ratione minus cupiditate, praesentium beatae
          numquam. Veritatis fugit tempore ab, autem sapiente hic. Explicabo
          quidem possimus fugiat earum commodi et, corporis ullam iusto nihil.
          Sint tempora aperiam maiores quas vel architecto laudantium quos neque
          cumque odio, ducimus qui quia.
        </div>
        <div className={styles.block + " textPanel"} ref={block2} id="block2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          maiores dolore, saepe fugiat enim quis non dicta deserunt blanditiis
          necessitatibus aut harum beatae eius velit natus? Delectus fugit
          inventore tempora culpa doloremque cumque natus quas est commodi
          veniam nisi accusantium dolor animi autem facilis ad esse,
          necessitatibus magni laboriosam earum?
        </div>
        <div className={styles.block + " textPanel"} ref={block3} id="block3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam omnis
          sint perspiciatis veniam culpa consectetur saepe? Quaerat dolorem
          perspiciatis reprehenderit dolores dicta minima. Blanditiis aliquid
          tenetur corrupti debitis soluta culpa eveniet. Architecto id eum,
          explicabo ea voluptates dicta corporis dolorem quidem at nam tenetur
          fuga consequuntur expedita aut magni odit.
        </div>
        <div className={styles.block + " textPanel"} ref={block4} id="block4">
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
export default IllustrationSection;
