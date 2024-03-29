import { useState, useRef, MutableRefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "../styles.module.scss";
import illustrationStyle from "../styles/illustrationSection.module.scss";

import {
  illustration1,
  illustration2,
  illustration3,
  illustration4,
} from "../assets/illustrations";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const IllustrationSection = () => {
  const sectionRef: MutableRefObject<any> = useRef();
  const illustationSectionRef: MutableRefObject<any> = useRef(null);
  const [illustrationSize, setSize] = useState("320px");

  const illustationTimeline = (): gsap.core.Timeline => {
    let panels = gsap.utils.toArray("." + styles.IllustrationBlock);

    return gsap.timeline().to(
      panels,
      {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        duration: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          scrub: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.2,
            delay: 0,
            ease: "sine.in",
          },
          // end: () => "+=" + sectionRef.current.offsetWidth,
        },
      },
      "<"
    );
  };
  const textTimeline = (): gsap.core.Timeline => {
    let panels = gsap.utils.toArray("." + illustrationStyle.textBlock);

    return gsap.timeline().to(
      panels,
      {
        yPercent: -100 * (panels.length - 1),
        ease: "none",
        duration: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.2,
            delay: 0,
            ease: "sine.in",
          },
          // end: () => "+=" + sectionRef.current.offsetWidth,
        },
      },
      "<"
    );
  };
  useLayoutEffect(() => {
    if (sectionRef && sectionRef.current) {
      let negativeSpace =
        sectionRef.current.offsetWidth < 700
          ? 0.85
          : sectionRef.current.offsetWidth > sectionRef.current.offsetHeight
          ? 0.65
          : 0.5;

      let newSize = Math.max(
        sectionRef.current.offsetWidth < sectionRef.current.offsetHeight
          ? Math.floor(sectionRef.current.offsetWidth * negativeSpace)
          : Math.floor(sectionRef.current.offsetHeight * negativeSpace),
        30
      );
      let newSizeText = `${newSize}px`;
      illustationSectionRef.current.style.maxWidth = `${newSize}px`;
      illustationSectionRef.current.style.maxHeight = `${newSize}px`;
      setSize(newSizeText);
    }
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.add(textTimeline(), "<");
      timeline.add(illustationTimeline(), "<");
      return timeline;
    }, sectionRef);
    return () => ctx.revert();
  }, [sectionRef]);
  return (
    <section
      className={illustrationStyle.IllustrationSection}
      ref={sectionRef}
      id="section">
      <div
        className={illustrationStyle.imgBlockContainer}
        ref={illustationSectionRef}>
        <div className={styles.IllustrationBlock} id="illustration1">
          <Image
            alt=""
            src={illustration1}
            style={{ width: illustrationSize, height: illustrationSize }}
          />
        </div>
        <div className={styles.IllustrationBlock} id="illustration2">
          <Image
            alt=""
            src={illustration2}
            style={{ width: illustrationSize, height: illustrationSize }}
          />
        </div>
        <div className={styles.IllustrationBlock} id="illustration3">
          <Image
            alt=""
            src={illustration3}
            style={{ width: illustrationSize, height: illustrationSize }}
          />
        </div>
        <div className={styles.IllustrationBlock} id="illustration4">
          <Image
            alt=""
            src={illustration4}
            style={{ width: illustrationSize, height: illustrationSize }}
          />
        </div>
      </div>
      <div className={illustrationStyle.textBlockContainer}>
        <div className={illustrationStyle.textBlock} id="block1">
          <h2>Empathy First</h2>
          <p>
            {`We understand that financial well-being is deeply personal.We
          approach every situation with empathy, seeking to understand our
          user's unique needs.`}
          </p>
        </div>
        <div className={illustrationStyle.textBlock} id="block2">
          <h2>Innovation with Purpose</h2>
          <p>
            {`We're committed to continuously improving and innovating, but always with the intention of serving the greater good.`}
          </p>
        </div>
        <div className={illustrationStyle.textBlock} id="block3">
          <h2>Community Matters</h2>
          <p>
            {`We believe in the power of community, and we're dedicated to building a supportive ecosystem for our users.`}
          </p>
        </div>
        <div className={illustrationStyle.textBlock} id="block4">
          <h2>Trust & Transparency</h2>
          <p>
            {`Trust is the cornerstone of our relationships. We're open, honest, and transparent in everything we do.`}
          </p>
        </div>
      </div>
    </section>
  );
};
export default IllustrationSection;
