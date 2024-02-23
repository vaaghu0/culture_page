import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "../styles.module.scss";
import { tree } from "next/dist/build/templates/app-page";
gsap.registerPlugin(ScrollTrigger);

export const IllustrationSection = () => {
  const trigger = useRef(null);
  const sessionContainer = useRef(null);
  const blocks = useRef(null);
  useEffect(() => {
    const blocksArray = gsap.utils.toArray(blocks);
    const result = gsap.to(blocks.current, {
      duration: 2,
      xPercent: -100 * blocksArray.length,
      scrollTrigger: {
        pin: true,
        trigger: trigger.current,
        scrub: true,
        end: "+=3000",
      },
    });
    return () => {
      result.kill();
    };
  });
  return (
    <>
      <div ref={trigger} className={styles.blocks}>
        <div className={styles.block} ref={blocks}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          deleniti reprehenderit ratione minus cupiditate, praesentium beatae
          numquam. Veritatis fugit tempore ab, autem sapiente hic. Explicabo
          quidem possimus fugiat earum commodi et, corporis ullam iusto nihil.
          Sint tempora aperiam maiores quas vel architecto laudantium quos neque
          cumque odio, ducimus qui quia.
        </div>
        <div className={styles.block} ref={blocks}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          maiores dolore, saepe fugiat enim quis non dicta deserunt blanditiis
          necessitatibus aut harum beatae eius velit natus? Delectus fugit
          inventore tempora culpa doloremque cumque natus quas est commodi
          veniam nisi accusantium dolor animi autem facilis ad esse,
          necessitatibus magni laboriosam earum?
        </div>
        <div className={styles.block} ref={blocks}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam omnis
          sint perspiciatis veniam culpa consectetur saepe? Quaerat dolorem
          perspiciatis reprehenderit dolores dicta minima. Blanditiis aliquid
          tenetur corrupti debitis soluta culpa eveniet. Architecto id eum,
          explicabo ea voluptates dicta corporis dolorem quidem at nam tenetur
          fuga consequuntur expedita aut magni odit.
        </div>
        <div className={styles.block} ref={blocks}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis beatae
          deserunt sit quo voluptate fugit dolorum aspernatur numquam eum
          voluptatibus repellat iure modi in ratione tenetur natus, ipsa magni
          qui inventore accusamus architecto mollitia amet cumque? Sint vero,
          doloremque tempore, obcaecati quidem illum consequatur harum doloribus
          iure laudantium, dolores porro?
        </div>
      </div>
    </>
  );
};
