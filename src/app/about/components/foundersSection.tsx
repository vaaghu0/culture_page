"use client";

import {
  useLayoutEffect,
  useRef,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import styles from "../styles.module.scss";
import { founder1, founder2, founder3, founder4, Linkedin } from "../assets";
import { foundersSectionStyle } from "../styles";
//gsap
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { constants } from "../utils";

gsap.registerPlugin(ScrollTrigger);
type Props = {
  name: string;
};

const FounderInfoBlock: React.FC<{ name: string }> = ({ name }) => {
  const openLink = () => {
    window.open("https://www.linkedin.com/in/vaaghu-40087622a/", "_blank");
  };

  return (
    <div className={foundersSectionStyle.secondaryFounderCard}>
      <p className={foundersSectionStyle.founderOneLiner}>
        I REALLY LOVE TO TALK WITH PEOPLE
      </p>
      <div className={foundersSectionStyle.founderInfo}>
        <div>
          <p className={foundersSectionStyle.founderName} onClick={openLink}>
            {name}
          </p>
          <Linkedin
            className={foundersSectionStyle.linkedinIcon}
            // link="https://google.com"
          />
        </div>
        <div>
          <p>Co-founder ,</p>
          <p>Product</p>
        </div>
      </div>
    </div>
  );
};

const FounderCard: React.FC<{ name: string; isMobile?: boolean }> = ({
  name,
  isMobile = false,
}) => {
  useEffect(() => {}, [isMobile]);
  if (isMobile) {
    return (
      <div className={foundersSectionStyle.founderCard}>
        <Image
          className={foundersSectionStyle.foundersImage}
          src={founder1}
          alt="Founder"
        />
        <FounderInfoBlock name={name} />
        <p className={foundersSectionStyle.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          commodi libero provident hic voluptatibus voluptas in beatae fugiat
          dolor a, repudiandae aliquam doloremque iure saepe numquam, eaque
          totam, vitae nam veritatis explicabo. Inventore quas asperiores
          eligendi iusto ullam fugiat nihil at blanditiis ab optio doloribus
          itaque consequuntur vitae, laudantium quis.
        </p>
      </div>
    );
  } else {
    return (
      <div className={foundersSectionStyle.founderCard}>
        <FounderInfoBlock name={name} />
        <div>
          <Image
            className={foundersSectionStyle.foundersImage}
            src={founder1}
            alt="Founder"
          />
          <p className={foundersSectionStyle.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            commodi libero provident hic voluptatibus voluptas in beatae fugiat
            dolor a, repudiandae aliquam doloremque iure saepe numquam, eaque
            totam, vitae nam veritatis explicabo. Inventore quas asperiores
            eligendi iusto ullam fugiat nihil at blanditiis ab optio doloribus
            itaque consequuntur vitae, laudantium quis.
          </p>
        </div>
      </div>
    );
  }
};

export const FoundersSection: React.FC = () => {
  const sectionRef: MutableRefObject<any> = useRef();

  const foundersListTimeline = () => {
    let panels = gsap.utils.toArray("." + foundersSectionStyle.founderCard);
    return gsap
      .timeline({})
      .set(".circle", { width: "10px" }, 0)
      .to(
        panels,
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: sectionRef.current,
            start: "top",
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
  };
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (sectionRef.current) {
      if (sectionRef.current.offsetWidth < constants.MOBILE_OFFSET_WIDTH) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      foundersListTimeline();
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section className={foundersSectionStyle.foundersSection} ref={sectionRef}>
      <div className={foundersSectionStyle.foundersList}>
        <FounderCard name="Rithwin" isMobile={isMobile} />
        <FounderCard name="Rithwin" isMobile={isMobile} />
        <FounderCard name="Rithwin" isMobile={isMobile} />
        <FounderCard name="Rithwin" isMobile={isMobile} />
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
