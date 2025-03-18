import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import logo from "/src/assets/images/F1logo.svg"
import leclern from "/src/assets/images/leclern.mp4"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function App(){
  const finalPath = "M 10 80 Q 800 80 1500 80";
  const videoRef = useRef(null);
  const stringRef = useRef("M 10 80 Q 800 80 1500 80");
  const cursorRef = useRef();
  const [animDone, setAnimDone] = useState(false);
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();
    tl.to(".b1, .b2, .b3",{
      delay: 0.7,
      opacity: 1,
      duration: 0.5,
      immediateRender: false,
    })
    tl.to(".logo",{
      opacity: 1,
      duration: 0.5,
      immediateRender: false,
    })
    tl.to(".b1, .b2, .b3",{
      opacity: 0,
    })
    tl.to(".logo",{
      onComplete: () => {
        setAnimDone(true);
      },
      opacity: 1,
      y: -450,
      scale: 0.5,
    })
    tl.to(".leclern-video", {
      opacity: 0.5, 
      duration: 1,
      scrollTrigger:{
        trigger: ".leclern-video",
        end: "top -90%",
        onLeave: () => {
          videoRef.current.pause();
          videoRef.current.style.opacity = 0;
          gsap.to(".logo",{
            y: -150,
            scale: 1,
          })
        },
      }
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
    const scrollTriggerInstance = gsap.to(".page3 h1",{
      transform: "translate(-76%,0%)",
      scrollTrigger:{
        trigger: ".page3",
        scroller: "body",
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: true,
      },
    });
    return () => {
      scrollTriggerInstance.kill();
    };
  },[]);

  useEffect(() => {
    if (animDone) {
      gsap.to(videoRef.current, {
        opacity: 0.3,
        onStart: () => {
          videoRef.current.play();
        }
      });
    }
  },[animDone]);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const string = stringRef.current;
    const handleMouseMove = (dets) => {
      const rect = string.getBoundingClientRect();
      const relativeY = dets.clientY - rect.top; 
      gsap.to("svg path",{
        attr: {d: `M 10 80 Q ${dets.clientX} ${relativeY} 1500 80`},
        duration: 0.1,
        ease: "power1.out",
      })
    };
    const handleMouseLeave = () => {
      gsap.to("svg path",{
        attr:{d : finalPath},
        duration: 1.5,
        ease: "elastic.out(1,0.1)",
      })
      gsap.to(cursor,{
        border: "5px solid #f7e686",
        boxShadow: "inset 0 0 10px 2px rgb(255, 0, 47), 0 0 10px 2px rgb(255, 0, 47)",
        opacity: 1,
      })
    };
    const handleMouseEnter = () => {
      gsap.to(cursor,{
        border: "5px solid rgb(255, 223, 45)",
        boxShadow: "inset 0 0 15px 2px rgb(255, 0, 0), 0 0 15px 2px rgb(255, 0, 0)",
        opacity: 1,
      })
    };
    if(string){
      string.addEventListener("mouseleave",handleMouseLeave)
      string.addEventListener("mousemove",handleMouseMove)
      string.addEventListener("mouseenter",handleMouseEnter)
    }
    return () => {
      if (string){
        string.removeEventListener("mousemove", handleMouseMove)
        string.removeEventListener("mouseleave",handleMouseLeave)
        string.removeEventListener("mouseenter",handleMouseEnter)
      }}
  },[]);  

  useEffect(() => {
    const cursor = cursorRef.current;
    const page = document.querySelector(".page4");
    function handleMouseMove(event){
      const rect = page.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      console.log(relativeY);
      gsap.to(cursor,{
        x: event.clientX,
        y: relativeY,
        ease: "power3.out",
        duration: 1,
      })
    }
    function handleMouseEnter(){
      gsap.to(cursor,{
        opacity: 1,
      })
    }
    function handleMouseLeave(){
      gsap.to(cursor,{
        opacity: 0,
      })
    }
    page.addEventListener("mouseenter",handleMouseEnter);
    page.addEventListener("mousemove",handleMouseMove);
    page.addEventListener("mouseleave",handleMouseLeave);
    
    return () => {
    page.removeEventListener("mouseenter",handleMouseEnter);
    page.removeEventListener("mousemove",handleMouseMove);
    page.removeEventListener("mouseleave",handleMouseLeave);
    }
  },[]);
  return(
    <>
        <div className="page1">
          <h1 className="b1">WELCOME</h1>
          <h1 className="b2">TO</h1>
          <h1 className="b3">FORMULA 1</h1>
          <img src={logo} className="logo"/>
            <video className="leclern-video" muted ref={videoRef}>
              <source src={leclern} type="video/mp4" />
            </video>
        </div>
        <div className="page2">
          <div className="box">
            <img className="soft" src="https://upload.wikimedia.org/wikipedia/commons/d/df/F1_tire_Pirelli_PZero_Red.svg"/>
            <img className="medium" src="https://upload.wikimedia.org/wikipedia/commons/c/c6/F1_tire_Pirelli_PZero_Yellow_18.svg"/>
            <img className="hard" src="https://upload.wikimedia.org/wikipedia/commons/4/42/F1_tire_Pirelli_PZero_Gray.svg" title="Hard"/>
          </div>
        </div>
        <div className="page3">
            <img className="rb20" src="/src/assets/images/rb20.webp"/>
            <h1 style={{whiteSpace: "nowrap"}}>EXPERIENCE PURE SPEED</h1>
        </div>
        <div className="page4">
          <svg  className="string" width="100vw" height="200" ref={stringRef}>
            <path d="M 10 80 Q 800 80 1500 80"
            stroke="white" strokeWidth="3" fill="transparent"/>
          </svg>
          <div className="cursor" ref={cursorRef}></div>
        </div>
    </>
  );
}
