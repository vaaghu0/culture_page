import { useLayoutEffect, useRef } from "react";
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
    <div className={coinStyles.sheet}>
      <p>{Prop.text}</p>
    </div>
  );
};

export const CoinSection = () => {
  const coin = useRef(null);
  const section = useRef(null);
  const coinAnimation = () => {
    return gsap
      .timeline({ repeat: -1 })
      .set(coin.current, {
        x: -100,
      })
      .to(
        coin.current,
        {
          x: "100vw",
          duration: 2,
          yoyo: true,
          ease: "none",
          repeat: -1,
        },
        "<"
      )
      .to(
        coin.current,
        {
          yPercent: -200,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power1.out",
        },
        "<"
      )
      .to(
        coin.current,
        {
          rotationZ: 1000,
          duration: 1,
          repeat: -1,
          ease: "none",
        },
        "<"
      );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const time = gsap.timeline();
      time.add(coinAnimation());
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className={styles.section} ref={section}>
      <div className={coinStyles.coinDiv}>
        <div ref={coin}>
          <Coin />
        </div>
      </div>
      <div className={coinStyles.sheetDiv}>
        {/* <Sheet text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et! Repellat nesciunt quaerat obcaecati dolor iure! Voluptatum nulla vel iure perferendis nemo. Sapiente, id? Dolorem molestiae dignissimos laboriosam nesciunt ipsum repellendus, impedit dolores fuga est necessitatibus dolorum nam vitae placeat, ratione quis quos quaerat laborum pariatur. Accusantium accusamus nesciunt praesentium!" />
        <Sheet text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et! Repellat nesciunt quaerat obcaecati dolor iure! Voluptatum nulla vel iure perferendis nemo. Sapiente, id? Dolorem molestiae dignissimos laboriosam nesciunt ipsum repellendus, impedit dolores fuga est necessitatibus dolorum nam vitae placeat, ratione quis quos quaerat laborum pariatur. Accusantium accusamus nesciunt praesentium!" />
        <Sheet text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et! Repellat nesciunt quaerat obcaecati dolor iure! Voluptatum nulla vel iure perferendis nemo. Sapiente, id? Dolorem molestiae dignissimos laboriosam nesciunt ipsum repellendus, impedit dolores fuga est necessitatibus dolorum nam vitae placeat, ratione quis quos quaerat laborum pariatur. Accusantium accusamus nesciunt praesentium!" />
        <Sheet text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et! Repellat nesciunt quaerat obcaecati dolor iure! Voluptatum nulla vel iure perferendis nemo. Sapiente, id? Dolorem molestiae dignissimos laboriosam nesciunt ipsum repellendus, impedit dolores fuga est necessitatibus dolorum nam vitae placeat, ratione quis quos quaerat laborum pariatur. Accusantium accusamus nesciunt praesentium!" />
        <Sheet text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et! Repellat nesciunt quaerat obcaecati dolor iure! Voluptatum nulla vel iure perferendis nemo. Sapiente, id? Dolorem molestiae dignissimos laboriosam nesciunt ipsum repellendus, impedit dolores fuga est necessitatibus dolorum nam vitae placeat, ratione quis quos quaerat laborum pariatur. Accusantium accusamus nesciunt praesentium!" /> */}
      </div>
    </section>
  );
};

export default CoinSection;
