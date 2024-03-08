import { MutableRefObject, useLayoutEffect } from "react";

import teamsStyles from "../styles/teamSection.module.scss";

//gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Draggable from "gsap/dist/Draggable";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
/* 
  refer:
   * https://codepen.io/GreenSock/pen/RwKwLWK
  
  gsap.registerPlugin(ScrollTrigger, Draggable);
*/

/*

let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

// set initial state of items
gsap.set('.cards li', {xPercent: 400, opacity: 0, scale: 0});

const spacing = 0.1, // spacing of the cards (stagger)
	snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
	cards = gsap.utils.toArray('.cards li'),
	// this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
	animateFunc = element => {
	  	const tl = gsap.timeline();
		tl.fromTo(element, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false})
		  .fromTo(element, {xPercent: 400}, {xPercent: -400, duration: 1, ease: "none", immediateRender: false}, 0);
		return tl;
	},
	seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
	playhead = {offset: 0}, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
	wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
	scrub = gsap.to(playhead, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
		offset: 0,
		onUpdate() {
			seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
		},
		duration: 0.5,
		ease: "power3",
		paused: true
	}),
	trigger = ScrollTrigger.create({
		start: 0,
		onUpdate(self) {
			let scroll = self.scroll();
			if (scroll > self.end - 1) {
				wrap(1, 2);
			} else if (scroll < 1 && self.direction < 0) {
				wrap(-1, self.end - 2);
			} else {
				scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
				scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
			}
		},
		end: "+=3000",
		pin: ".gallery"
	}),
	// converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
	progressToScroll = progress => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end),
	wrap = (iterationDelta, scrollTo) => {
		iteration += iterationDelta;
		trigger.scroll(scrollTo);
		trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
	};

// when the user stops scrolling, snap to the closest item.
ScrollTrigger.addEventListener("scrollEnd", () => scrollToOffset(scrub.vars.offset));

// feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
function scrollToOffset(offset) { // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
	let snappedTime = snapTime(offset),
		progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration(),
		scroll = progressToScroll(progress);
	if (progress >= 1 || progress < 0) {
		return wrap(Math.floor(progress), scroll);
	}
	trigger.scroll(scroll);
}

document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.vars.offset + spacing));
document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.vars.offset - spacing));


function buildSeamlessLoop(items, spacing, animateFunc) {
	let rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live
		seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
			paused: true,
			repeat: -1, // to accommodate infinite scrolling/looping
			onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1
				this._time === this._dur && (this._tTime += this._dur - 0.01);
			},
      onReverseComplete() {
        this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
      }
		}),
		cycleDuration = spacing * items.length,
		dur; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

	// loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
	items.concat(items).concat(items).forEach((item, i) => {
		let anim = animateFunc(items[i % items.length]);
		rawSequence.add(anim, i * spacing);
		dur || (dur = anim.duration());
	});

	// animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
	seamlessLoop.fromTo(rawSequence, {
		time: cycleDuration + dur / 2
	}, {
		time: "+=" + cycleDuration,
		duration: cycleDuration,
		ease: "none"
	});
	return seamlessLoop;
}


// below is the dragging functionality (mobile-friendly too)...
Draggable.create(".drag-proxy", {
  type: "x",
  trigger: ".cards",
  onPress() {
    this.startOffset = scrub.vars.offset;
  },
  onDrag() {
    scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
    scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
  },
  onDragEnd() {
    scrollToOffset(scrub.vars.offset);
  }
});








// if you want a more efficient timeline, but it's a bit more complex to follow the code, use this function instead...
// function buildSeamlessLoop(items, spacing, animateFunc) {
// 	let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
// 		startTime = items.length * spacing + 0.5, // the time on the rawSequence at which we'll start the seamless loop
// 		loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime
// 		rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live
// 		seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
// 			paused: true,
// 			repeat: -1, // to accommodate infinite scrolling/looping
// 			onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1
// 				this._time === this._dur && (this._tTime += this._dur - 0.01);
// 			}
// 		}),
// 		l = items.length + overlap * 2,
// 		time, i, index;
//
// 	// now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
// 	for (i = 0; i < l; i++) {
// 		index = i % items.length;
// 		time = i * spacing;
// 		rawSequence.add(animateFunc(items[index]), time);
// 		i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
// 	}
//
// 	// here's where we set up the scrubbing of the playhead to make it appear seamless.
// 	rawSequence.time(startTime);
// 	seamlessLoop.to(rawSequence, {
// 		time: loopTime,
// 		duration: loopTime - startTime,
// 		ease: "none"
// 	}).fromTo(rawSequence, {time: overlap * spacing + 1}, {
// 		time: startTime,
// 		duration: startTime - (overlap * spacing + 1),
// 		immediateRender: false,
// 		ease: "none"
// 	});
// 	return seamlessLoop;
// }
*/

export const TeamsSection = () => {
  const section: MutableRefObject<any> = useRef();
  const prevButtonRef: MutableRefObject<any> = useRef();
  const nextButtonRef: MutableRefObject<any> = useRef();
  const drapProxyRef: MutableRefObject<any> = useRef();

  const teamAnimation = () => {
    const colors = ["#f38630", "#6fb936", "#ccc", "#6fb936"];
    const boxes: Array<Element> = gsap.utils.toArray(".teamMember");
    console.clear();
    gsap.set(boxes, {
      backgroundColor: gsap.utils.wrap(colors),
    });
    const t1 = gsap.timeline();

    t1.set(boxes, {
      x: "100vw",
    }).to(boxes, {
      xPercent: -100 * boxes.length,
      duration: 5,
      ease: "none",
      repeat: -1,
      onComplete: () => {
        console.log("complete");
      },
    });
    return t1;
  };

  const slider: MutableRefObject<any> = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

      // set initial state of items
      gsap.set(".cards li", {
        xPercent: 400,
        opacity: 0,
        scale: 0,
      });
      const buildSeamlessLoop = (
        items: any[],
        spacing: number,
        animateFunc: any
      ): gsap.core.Timeline => {
        let rawSequence = gsap.timeline({ paused: true }), // this is where all the "real" animations live
          seamlessLoop = gsap.timeline({
            // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
            paused: true,
            repeat: -1, // to accommodate infinite scrolling/looping
            onRepeat() {
              // works around a super rare edge case bug that's fixed GSAP 3.6.1
              this._time === this._dur && (this._tTime += this._dur - 0.01);
            },
            onReverseComplete() {
              this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
            },
          }),
          cycleDuration = spacing * items.length,
          dur: any; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

        // loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
        items
          .concat(items)
          .concat(items)
          .forEach((item, i) => {
            let anim = animateFunc(items[i % items.length]);
            rawSequence.add(anim, i * spacing);
            dur || (dur = anim.duration());
          });

        // animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
        seamlessLoop.fromTo(
          rawSequence,
          {
            time: cycleDuration + dur / 2,
          },
          {
            time: "+=" + cycleDuration,
            duration: cycleDuration,
            ease: "none",
          }
        );
        return seamlessLoop;
      };

      const spacing = 0.1, // spacing of the cards (stagger)
        snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
        cards = gsap.utils.toArray(".cards li"),
        // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
        animateFunc = (element: gsap.core.Tween): gsap.core.Timeline => {
          const tl = gsap.timeline();
          tl.fromTo(
            element,
            { scale: 1, opacity: 1 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false,
            }
          ).fromTo(
            element,
            { xPercent: 550 },
            {
              xPercent: -550,
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            0
          );
          return tl;
        },
        seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
        playhead = { offset: 0 }, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
        wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
        scrub = gsap.to(playhead, {
          // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
          offset: 0,

          onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
          },
          duration: 0.5,
          ease: "power3",
          paused: true,
        });
      // trigger = ScrollTrigger.create({
      //   start: 0,
      //   onUpdate(self) {
      //     let scroll = self.scroll();
      //     if (scroll > self.end - 1) {
      //       wrap(1, 2);
      //     } else if (scroll < 1 && self.direction < 0) {
      //       wrap(-1, self.end - 2);
      //     } else {
      //       scrub.vars.offset =
      //         (iteration + self.progress) * seamlessLoop.duration();
      //       scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
      //     }
      //   },
      //   end: "+=3000",
      //   pin: ".gallery",
      // }),
      // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
      // progressToScroll = (progress: number) =>
      //   gsap.utils.clamp(
      //     1,
      //     trigger.end - 1,
      //     gsap.utils.wrap(0, 1, progress) * trigger.end
      //   ),
      // wrap = (iterationDelta: number, scrollTo: number) => {
      //   iteration += iterationDelta;
      //   trigger.scroll(scrollTo);
      //   trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
      // };

      // when the user stops scrolling, snap to the closest item.
      // ScrollTrigger.addEventListener("scrollEnd", () =>
      //   scrollToOffset(scrub.vars.offset)
      // );

      // feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
      function scrollToOffset(offset: number) {
        // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
        let snappedTime = snapTime(offset),
          progress =
            (snappedTime - seamlessLoop.duration() * iteration) /
            seamlessLoop.duration();
        // scroll = progressToScroll(progress);
        if (progress >= 1 || progress < 0) {
          // return wrap(Math.floor(progress), scroll);
        }
        // trigger.scroll(scroll);
      }

      if (prevButtonRef && prevButtonRef.current)
        prevButtonRef.current.addEventListener("click", () =>
          scrollToOffset(scrub.vars.offset + spacing)
        );
      if (nextButtonRef && nextButtonRef.current)
        nextButtonRef.current.addEventListener("click", () =>
          scrollToOffset(scrub.vars.offset - spacing)
        );

      // below is the dragging functionality (mobile-friendly too)...
      Draggable.create(drapProxyRef.current, {
        type: "x",
        trigger: ".cards",
        onPress() {
          this.startOffset = scrub.vars.offset;
        },
        onDrag() {
          scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
          scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
        },
        onDragEnd() {
          scrollToOffset(scrub.vars.offset);
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className={teamsStyles.section}>
      <div className={`gallery ${teamsStyles.gallery}`}>
        <ul className={`cards ${teamsStyles.teams}`}>
          <li>0</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
        <div className={teamsStyles.actions}>
          <button className={teamsStyles.button} ref={prevButtonRef}>
            Prev
          </button>
          <button className={teamsStyles.button} ref={nextButtonRef}>
            Next
          </button>
        </div>
      </div>
      <div className={teamsStyles.dragProxy} ref={drapProxyRef}></div>
      {/* 
      <div id="#teams" className={teamsStyles.teams} ref={slider}>
        <div className="teamMember">0</div>
        <div className="teamMember">1</div>
        <div className="teamMember">2</div>
        <div className="teamMember">3</div>
        <div className="teamMember">4</div>
        <div className="teamMember">5</div>
        <div className="teamMember">6</div>
        <div className="teamMember">7</div>
      </div> */}
    </section>
  );
};
export default TeamsSection;
