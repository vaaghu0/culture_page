import { MutableRefObject, useLayoutEffect } from "react";

import teamsStyles from "../styles/teamSection.module.scss";

//gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export const TeamsSection = () => {
  const section: MutableRefObject<any> = useRef();

  const teamAnimation = () => {
    const colors = ["#f38630", "#6fb936", "#ccc", "#6fb936"];
    const boxes: Array<Element> = gsap.utils.toArray(".teamMember");
    console.clear();
    gsap.set(boxes, {
      backgroundColor: gsap.utils.wrap(colors),
    });
    const t1 = gsap.timeline();
    boxes.forEach((member) => {
      t1.set(member, {
        x: "100vw",
      }).to(member, {
        x: "-100vw",
        duration: 5,
        ease: "none",
        repeat: -1,
        onComplete: () => {
          console.log("complete");
        },
      });
    });

    // boxes.forEach((member) => {
    //   t1
    // });
    return t1;
  };
  // const addAtEnd = (time, member) => {
  //   time.to(member, {
  //     x: "-100vw",
  //   });
  // };
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      teamAnimation();
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section}>
      <div id="#teams" className={teamsStyles.teams}>
        <div className="teamMember">0</div>
        {/* <div className="teamMember">1</div>
        <div className="teamMember">2</div>
        <div className="teamMember">3</div>
        <div className="teamMember">4</div>
        <div className="teamMember">5</div>
        <div className="teamMember">6</div>
        <div className="teamMember">7</div> */}
      </div>
    </section>
  );
};
export default TeamsSection;
