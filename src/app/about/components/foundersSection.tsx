import React, { useLayoutEffect, useRef } from "react";
import styles from "../styles.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Block = () => {
  return (
    <>
      {/* <img /> */}
      <p>dawdawdawdawdawd</p>
    </>
  );
};

export const FoundersSection: React.FC = () => {
  const sectionRef = useRef(null);

  const foundersListTimeline = () => {
    let panels = gsap.utils.toArray(".founders");
    console.log(panels);
    return gsap.timeline().to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      delay: 10,
      duration: 10,
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: sectionRef.current,
        start: "top top",
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 0.5,
          delay: 0,
          ease: "expo",
        },
        scrub: true,
        // markers: true,
      },
    });
  };
  const dotesTimeline = () => {
    return gsap.timeline().to(".circle", {
      xPercent: 100 * 9,
      ease: "none",
      delay: 10,
      duration: 10,
      scrollTrigger: {
        trigger: sectionRef.current,
        // pin: sectionRef.current,
        start: "top top",
        scrub: true,
        // markers: true,
      },
    });
  };
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let t1 = gsap.timeline();
      t1.add(foundersListTimeline());
      t1.add(dotesTimeline());
    }, sectionRef);
    return () => ctx.revert();
  });
  return (
    <section className={styles.foundersSection} ref={sectionRef}>
      <div className={styles.foundersList}>
        <div className="founders"></div>
        <div className="founders"></div>
        <div className="founders"></div>
        <div className="founders"></div>
      </div>
      <div className={styles.dotes}>
        <div className={styles.circle + " circle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
        <div className={styles.goastCircle + " goastCircle"}></div>
      </div>
    </section>
  );
};
export default FoundersSection;
