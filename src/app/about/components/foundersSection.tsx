import { useLayoutEffect, useRef, MutableRefObject } from "react";
import styles from "../styles.module.scss";
import { founder1, founder2, founder3, founder4, Linkedin } from "../assets";
import { foundersSectionStyle } from "../styles";
//gsap
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Block = () => {
  return (
    <>
      {/* <img /> */}``
      <p>dawdawdawdawdawd</p>
    </>
  );
};
type Props = {
  name: string;
};
const FounderCard: React.FC<Props> = ({ name }) => {
  return (
    <div className={foundersSectionStyle.founderCard}>
      <Image
        className={foundersSectionStyle.foundersImage}
        src={founder1}
        alt="Founder"
      />
      <div className={foundersSectionStyle.secondaryFounderCard}>
        <p className={foundersSectionStyle.founderOneLiner}>
          I REALLY LOVE TO TALK WITH PEOPLE
        </p>
        <div className={foundersSectionStyle.founderInfo}>
          <div>
            <p className={foundersSectionStyle.founderName}>{name}</p>
            <Linkedin
              className={foundersSectionStyle.linkedinIcon}
              link="https://google.com"
            />
          </div>
          <div>
            <p>Co-founder ,</p>
            <p>Product</p>
          </div>
        </div>
      </div>
      <p className={foundersSectionStyle.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        commodi libero provident hic voluptatibus voluptas in beatae fugiat
        dolor a, repudiandae aliquam doloremque iure saepe numquam, eaque totam,
        vitae nam veritatis explicabo. Inventore quas asperiores eligendi iusto
        ullam fugiat nihil at blanditiis ab optio doloribus itaque consequuntur
        vitae, laudantium quis.
      </p>
    </div>
  );
};

export const FoundersSection: React.FC = () => {
  const sectionRef: MutableRefObject<any> = useRef();

  const foundersListTimeline = () => {
    let panels = gsap.utils.toArray("." + foundersSectionStyle.founderCard);
    console.log(panels);
    return gsap
      .timeline({})
      .set(".circle", { width: "10px" }, 0)
      .to(
        panels,
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: sectionRef.current,
            start: "top top",
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 1,
              delay: 0,
              ease: "expo",
            },
            scrub: true,
            // markers: true,
          },
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          delay: 50,
          duration: 100,
        },
        ">"
      );
    // .to(".circle", {E
    //   width: 40,
    //   duration: 25,
    //   repeat: 0,
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top top",
    //     scrub: true,
    //   },
    // });
  };
  const dotesTimeline = () => {
    return gsap.timeline().to(
      ".circle",
      {
        x: 10 * 9,
        ease: "none",
        delay: 10,
        duration: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: true,
        },
      },
      0
    );
  };
  const dotesSize = () => {
    return gsap
      .timeline()
      .set(".circle", { width: "10px" })
      .to(".circle", {
        width: 40,
      })
      .to(".circle", {
        width: "10px",
      });
  };
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // let t1 = gsap.timeline();
      foundersListTimeline();
      // t1.add(dotesTimeline());
      // t1.add(dotesSize(), "<");
    }, sectionRef);
    return () => ctx.revert();
  });
  return (
    <section className={foundersSectionStyle.foundersSection} ref={sectionRef}>
      <div className={foundersSectionStyle.foundersList}>
        <FounderCard name="Rithwin" />
        <FounderCard name="Rithwin" />
        <FounderCard name="Rithwin" />
        <FounderCard name="Rithwin" />
      </div>
      {/* <div className={styles.dotes}>
        <div className={styles.circle + " circle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
      </div> */}
    </section>
  );
};
export default FoundersSection;
