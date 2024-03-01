import { useLayoutEffect, useRef, MutableRefObject } from "react";
import Coin from "../assets/coin";
import styles from "../styles.module.scss";
import coinStyles from "../styles/coinSection.module.scss";

//gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
type Prop = {
  text: string;
};

const Sheet = (Prop: Prop) => {
  return (
    <div className={coinStyles.sheet + " sheet"}>
      <p>{Prop.text}</p>
    </div>
  );
};

export const CoinSection = () => {
  const coin = useRef(null);
  const section: MutableRefObject<any> = useRef(null);
  const coinAnimation = () => {
    const duration = 10;
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: section.current,
          pin: section.current,
          scrub: true,
        },
      })
      .set(coin.current, {
        xPercent: -100,
        visibility: "visible",
        scale: section.current.offsetHeight / 1000,
      })
      .to(
        coin.current,
        {
          x: "120vw",
          duration: duration * 2,
          ease: "none",
        },
        "<"
      )
      .to(
        coin.current,
        {
          yPercent: -200,
          duration: duration,
          ease: "power1.out",
        },
        "<"
      )
      .to(
        coin.current,
        {
          yPercent: 0,
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
          start: "0vh",
          // pin: section.current,
          scrub: true,
        },
      })
      .to(
        coin.current,
        {
          duration: 100,
          rotationZ: 360,
          ease: "none",
          repeat: -1,
        },
        "<"
      );
  };
  const sheetMovement = () => {
    let duration = 2;
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "0vh",
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
          opacity: 0,
          duration: duration,
        });
      });
    return t1;
  };
  const TextAnimation = () => {
    let duration = 10;
    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        // markers: true,
        scrub: true,
        // pin: true,
        start: "0vw",
      },
    });
    gsap.utils
      .toArray<HTMLDivElement>(".comet")
      .forEach((element: HTMLDivElement) => {
        t1.to(element, {
          opacity: 1,
          duration: duration,
        });
      });
  };
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      coinRotationAimation();
      coinAnimation();
      sheetMovement();
      TextAnimation();
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className={coinStyles.section} ref={section}>
      <div className={coinStyles.coinDescription}>
        <p className="comet">C</p>
        <p className="comet">O</p>
        <p className="comet">M</p>
        <p className="comet">E</p>
        <p className="comet">T</p>
      </div>
      <div className={coinStyles.coinDiv}>
        <div ref={coin}>
          <Coin />
        </div>
      </div>
      <div className={coinStyles.sheetDiv}>
        <Sheet text="1111Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et! Repellat nesciunt quaerat obcaecati dolor iure! Voluptatum nulla vel iure perferendis nemo. Sapiente, id? Dolorem molestiae dignissimos laboriosam nesciunt ipsum repellendus, impedit dolores fuga est necessitatibus dolorum nam vitae placeat, ratione quis quos quaerat laborum pariatur. Accusantium accusamus nesciunt praesentium!" />
        <Sheet text="2222Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla reiciendis labore dolor repellat, esse atque voluptatum repellendus autem quisquam iste expedita dolore doloremque optio delectus vel eaque eligendi quam. Temporibus maiores ut quae id molestiae dolore, architecto quia. Maxime illum illo qui itaque dolor reprehenderit unde accusantium molestiae perspiciatis eaque?" />
        <Sheet text="3333Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla reiciendis labore dolor repellat, esse atque voluptatum repellendus autem quisquam iste expedita dolore doloremque optio delectus vel eaque eligendi quam. Temporibus maiores ut quae id molestiae dolore, architecto quia. Maxime illum illo qui itaque dolor reprehenderit unde accusantium molestiae perspiciatis eaque?" />
        <Sheet text="4444Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla reiciendis labore dolor repellat, esse atque voluptatum repellendus autem quisquam iste expedita dolore doloremque optio delectus vel eaque eligendi quam. Temporibus maiores ut quae id molestiae dolore, architecto quia. Maxime illum illo qui itaque dolor reprehenderit unde accusantium molestiae perspiciatis eaque?" />
      </div>
    </section>
  );
};

export default CoinSection;
