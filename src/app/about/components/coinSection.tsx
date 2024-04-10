import { useLayoutEffect, useRef, MutableRefObject } from "react";
import Coin from "../assets/coin";
import styles from "../styles.module.scss";
import coinStyles from "../styles/coinSection.module.scss";

//gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Sheet: React.FC<{ text: string; title: string }> = ({ title, text }) => {
  return (
    <div className={coinStyles.sheet + " sheet"}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export const CoinSection = () => {
  const coin = useRef(null);
  const section: MutableRefObject<any> = useRef(null);
  const coinAnimation = () => {
    const duration = 100;
    return gsap
      .timeline({
        delay: 10,
        scrollTrigger: {
          start: "top top",
          trigger: section.current,
          pin: true,
          scrub: true,
        },
      })
      .set(coin.current, {
        x: "-60vw",
        visibility: "visible",
        scale: section.current.offsetHeight / 1000,
      })
      .to(
        coin.current,
        {
          x: "60vw",
          duration: duration * 2,
          ease: "none",
        },
        "<"
      )
      .to(
        coin.current,
        {
          y: "-30vh",
          duration: duration,
          ease: "power1.out",
        },
        "<"
      )
      .to(
        coin.current,
        {
          y: "0vh",
          duration: duration,
          ease: "power1.in",
        },
        ">"
      );
  };
  const coinRotationAimation = () => {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top",
          scrub: true,
        },
      })
      .to(
        coin.current,
        {
          duration: 1000,
          rotationZ: 360,
          ease: "none",
          repeat: -1,
          repeatDelay: 1,
        },
        "<"
      );
  };
  const sheetMovement = () => {
    let duration = 1000;
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top",
        // pin: section.current,
        scrub: true,
      },
    });
    gsap.utils
      .toArray<HTMLDivElement>(`.sheet`)
      .reverse()
      .forEach((element: HTMLDivElement) => {
        t1.set(element, {
          y: "0vh",
          duration: -1,
        }).to(element, {
          y: "-100vh",
          delay: 100,
          duration: duration,
        });
      });
    return t1;
  };
  const TextAnimation = (): gsap.core.Timeline => {
    let duration = 5;
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top",
        scrub: true,
      },
    });
    gsap.utils
      .toArray<HTMLDivElement>("." + coinStyles.cometCharacter)
      .forEach((element: HTMLDivElement) => {
        t1.to(element, {
          opacity: 1,
          duration: duration,
        });
      });
    return t1;
  };
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.add(TextAnimation(), "<");
      t1.add(coinRotationAimation(), "<");
      t1.add(coinAnimation(), "<");
      t1.add(sheetMovement(), "<");
      return t1;
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className={coinStyles.coinSection} ref={section}>
      <div className={coinStyles.info}>
        <div className={coinStyles.oneLiner}>
          <p className={coinStyles.oneLinerPartOne}>
            We believe in THE
            <span className={coinStyles.cometCharacter}>C</span>
            <span className={coinStyles.cometCharacter}>O</span>
            <span className={coinStyles.cometCharacter}>M</span>
            <span className={coinStyles.cometCharacter}>E</span>
            <span className={coinStyles.cometCharacter}>T</span>
          </p>
        </div>
        <p className={coinStyles.description}>
          {`At Vittae, we abide by "THE COMET," our guiding work culture values`}
        </p>
      </div>
      <div className={coinStyles.coinDiv}>
        <div ref={coin}>
          <Coin />
        </div>
      </div>
      <div className={coinStyles.sheetDiv}>
        <Sheet
          title="Transparency"
          text="Be open and loud about what you feel. We believe honest communication is the true key to great collaboration and output."
        />
        <Sheet
          title="Enterprising"
          text="Curiosity mixed with the drive to impact and think out of the box is key to your personal growth. Take up challenges and bring out your thinking hats from time to time to showcase that you are willing to go the extra mile."
        />
        <Sheet
          title="Micro-Productivity"
          text="No task is too big, make sure that you are able to divide your tasks into smaller chunks and improve them with constant 360-degree feedback. This will also give you the opportunity to celebrate small wins."
        />
        <Sheet
          title="Optimism"
          text="Take on every day and every opportunity with a positive outlook. Believe in yourself and remember that you can do anything."
        />
        <Sheet
          title="Championship"
          text="Day zero should start with you being the champion for our customers, our brand & employees, and to your goals. You will be the facilitators of change and will lead the company across to future change"
        />
      </div>
    </section>
  );
};

export default CoinSection;
