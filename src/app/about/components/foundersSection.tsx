import React, { useLayoutEffect, useRef } from "react";
import styles from "../styles.module.scss";
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

export const FoundersSection: React.FC = () => {
  const sectionRef = useRef(null);

  const foundersListTimeline = () => {
    let panels = gsap.utils.toArray(".founders");
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
              duration: 0.1,
              delay: 0,
              ease: "expo",
            },
            scrub: true,
            // markers: true,
          },
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          delay: 10,
          duration: 100,
        },
        ">"
      );
    // .to(".circle", {
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
      let t1 = gsap.timeline();
      foundersListTimeline();
      t1.add(dotesTimeline());
      t1.add(dotesSize(), "<");
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
