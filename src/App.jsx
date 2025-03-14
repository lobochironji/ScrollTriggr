import gsap from "gsap"
import { useEffect, useRef } from "react";
import logo from "/src/assets/images/F1logo.svg"
import leclern from "/src/assets/images/leclern.mp4"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function App(){
  const videoRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0,0);
    let tl = gsap.timeline();
    tl.to(".b1",{
      opacity: 1,
      duration: 0.5,
      delay: 1,
      immediateRender: false,
    })
    tl.to(".b2",{
      opacity: 1,
      duration: 0.5,
      immediateRender: false,
    })
    tl.to(".b3",{
      opacity: 1,
      duration: 0.5,
      immediateRender: false,
    })
    tl.to(".logo",{
      opacity: 1,
      duration: 0.5,
      immediateRender: false,
    })
    gsap.to(".leclern-video", {
      opacity: 1,
      duration: 5,
      scrollTrigger: {
        trigger: ".leclern-video",
        start: "top 95%",
        scrub: true,
        onEnter: () => {
          if(videoRef.current){
            videoRef.current.play();
          }
        }
      },
    })
    gsap.to(".soft",{
      opacity: 1,
      rotate: 1080,
      scrollTrigger: {
        trigger: ".soft",
        scroller: "body",
        scrub: 5,
      }
    })
    gsap.to(".medium",{
      opacity: 1,
      rotate: 720,
      scrollTrigger: {
        trigger: ".medium",
        scroller: "body",
        scrub: 5,
      }
    })
    gsap.to(".hard",{
      opacity: 1,
      rotate: 360,
      scrollTrigger: {
        trigger: ".hard",
        scroller: "body",
        scrub: 5,
      }
    })
    gsap.to(".page3 > h1",{
      transform: "translateX(-150%)",
      scrollTrigger:{
        trigger: ".page3",
        scroller: "body",
        start: "top top",
        end: "top -100%",
        markers: true,
        scrub: 1,
        pin: true,
      }
    });
  },[]);
  
  return(
    <>
      <div className="page1">
        <h1 className="b1">WELCOME</h1>
        <h1 className="b2">TO</h1>
        <h1 className="b3">FORMULA 1</h1>
        <img src={logo} className="logo"/>
      </div>
      <div className="page2">
        <video className="leclern-video" muted ref={videoRef}>
          <source type="video/mp4" />
        </video>
        <div className="box">
          <img className="soft" src="https://upload.wikimedia.org/wikipedia/commons/d/df/F1_tire_Pirelli_PZero_Red.svg"/>
          <img className="medium" src="https://upload.wikimedia.org/wikipedia/commons/c/c6/F1_tire_Pirelli_PZero_Yellow_18.svg"/>
          <img className="hard" src="https://upload.wikimedia.org/wikipedia/commons/4/42/F1_tire_Pirelli_PZero_Gray.svg" title="Hard"/>
        </div>
      </div>
      <div className="page3">
        <h1>EXPERIENCE</h1>
      </div>
      <div className="page4">
      </div>
    </>
  )
}
