'use client';

import { useRef, useEffect } from 'react';

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Timeline of hero-boomerang.mp4:
    // 0s  -> 10s: First fully playing (normal forward run)
    // 10s -> 15s: Reversed segment (10s back to 5s)
    // At ~14.95s, loop back to 5.0s so it plays 5s -> 10s forward, then 10s -> 15s backward.
    const BOUNCE_START = 5.0;
    const BOUNCE_END = 14.95;

    let animId;
    const checkLoop = () => {
      if (video.currentTime >= BOUNCE_END) {
        video.currentTime = BOUNCE_START;
        video.play().catch(() => {});
      }
      animId = requestAnimationFrame(checkLoop);
    };

    animId = requestAnimationFrame(checkLoop);

    const handleEnded = () => {
      video.currentTime = BOUNCE_START;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);

    // Ensure playback starts
    video.play().catch(() => {
      const handleUserInteraction = () => {
        video.play().catch(() => {});
      };
      window.addEventListener('click', handleUserInteraction, { once: true });
      window.addEventListener('touchstart', handleUserInteraction, { once: true });
    });

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className="framer-15w1qw8" data-framer-name="Hero" id="hero">
      <div className="framer-1p46al4" data-framer-name="Container">
        <div className="framer-1g9zx9" data-framer-name="Header">
          <div id="hero-video-wrapper" className="hero-video-card">
            <video
              ref={videoRef}
              id="hero-boomerang-video"
              src="/images/hero-boomerang.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="framer-1ws1c3f" data-framer-name="Content Wrapper">
            <div className="framer-mklr9n" data-framer-appear-id="mklr9n" data-framer-name="Text Wrapper" style={{ opacity: "1", transform: "none" }}>
              <div className="framer-1ns3x67" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <p className="framer-text framer-styles-preset-myvcqd" data-styles-preset="vnfdw_xAY" dir="auto" style={{ "--framer-text-alignment": "left" }}>I'M SOURABH</p>
              </div>
              <div className="framer-14dkztq" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h1 className="framer-text framer-styles-preset-1iszveu" data-styles-preset="BxrGaJblF" dir="auto" style={{ "--framer-text-alignment": "left" }}>Building polished interfaces that feel effortless.</h1>
              </div>
              <div className="framer-10y77co" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <p className="framer-text framer-styles-preset-myvcqd" data-styles-preset="vnfdw_xAY" dir="auto" style={{ "--framer-text-alignment": "left" }}>I build responsive, performant frontend experiences with thoughtful interactions and clean, maintainable code.</p>
              </div>
            </div>
            <div className="framer-1luurh7" data-framer-appear-id="1luurh7" data-framer-name="Actions" style={{ opacity: "1", transform: "none" }}>
              <div className="ssr-variant">
                <div className="framer-px950e-container">
                  <a className="framer-IYN0L framer-ZROfX framer-l5zbuo framer-v-l5zbuo framer-11131nd" data-framer-name="Primary" href="https://github.com/NoobSourabh" style={{ "--border-bottom-width": "0px", "--border-color": "rgba(0, 0, 0, 0)", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "solid", "--border-top-width": "0px", backgroundColor: "var(--token-b57a4573-ef01-446f-89ba-6fc5461bb54f, rgb(189, 238, 99))", height: "100%", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                    <div className="framer-mb4s8" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1t46aaw" data-styles-preset="YNEdw0Tqm" dir="auto" style={{ "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17)))" }}>View GitHub</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="ssr-variant">
                <div className="framer-s0afkv-container">
                  <a className="framer-IYN0L framer-ZROfX framer-l5zbuo framer-v-f69p1b framer-11131nd" data-framer-name="Secondary" data-border="true" href="https://github.com/NoobSourabh" target="_blank" rel="noopener" style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-8ac823af-7d80-4133-952a-528a09c81339, rgb(237, 237, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-880999e0-fa5d-4c65-a75a-ae1653ed7391, rgb(255, 255, 255))", height: "100%", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                    <div className="framer-mb4s8" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1t46aaw" data-styles-preset="YNEdw0Tqm" dir="auto" style={{ "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17)))" }}>GitHub Profile</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="framer-1a1apuj" data-framer-name="Visual">
          <div className="framer-138p8xp-container hidden-b6pbbz hidden-1m3130y" data-framer-appear-id="138p8xp" style={{ opacity: "1", transform: "none" }}>
            <div
              className="framer-q9d11 framer-kZscH framer-r7dCw framer-k5mB9 framer-13t80gm framer-v-13t80gm"
              data-framer-name="Desktop"
              style={{
                backgroundColor: "var(--token-c06ac48a-21a8-4582-b3d6-9f37581073a1, rgb(247, 247, 247))",
                height: "100%",
                width: "100%",
                borderBottomLeftRadius: "40px",
                borderBottomRightRadius: "40px",
                borderTopLeftRadius: "40px",
                borderTopRightRadius: "40px",
              }}
            >
              <div className="framer-34662m" data-framer-name="Header">
                <div
                  className="framer-1lnnovu"
                  style={{
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "inherit",
                      cornerShape: "inherit",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    data-framer-background-image-wrapper="true"
                  >
                    <img
                      decoding="async"
                      width="682"
                      height="682"
                      src="/images/adarsh-baghel.jpg"
                      alt="Adarsh Baghel"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        cornerShape: "inherit",
                        objectPosition: "center",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="framer-qe0017" data-framer-name="Text Wrapper">
                  <div
                    className="framer-oiy08i"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      "--extracted-r6o4lv": "var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17))",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      transform: "none",
                    }}
                  >
                    <p
                      className="framer-text framer-styles-preset-myvcqd"
                      data-styles-preset="vnfdw_xAY"
                      dir="auto"
                      style={{
                        "--framer-text-alignment": "left",
                        "--framer-text-color": "var(--extracted-r6o4lv, var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17)))",
                      }}
                    >
                      Adarsh Baghel
                    </p>
                  </div>
                  <div
                    className="framer-8vh36s"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      "--extracted-r6o4lv": "var(--token-e4c01179-4e7b-45a8-915a-d5bcd5f31dc2, rgb(51, 51, 51))",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      transform: "none",
                    }}
                  >
                    <p
                      className="framer-text framer-styles-preset-1e0m3iw"
                      data-styles-preset="wD8LD2XOT"
                      dir="auto"
                      style={{
                        "--framer-text-alignment": "left",
                        "--framer-text-color": "var(--extracted-r6o4lv, var(--token-e4c01179-4e7b-45a8-915a-d5bcd5f31dc2, rgb(51, 51, 51)))",
                      }}
                    >
                      Founder at RSENL AI LABS
                    </p>
                  </div>
                </div>
                <div
                  className="framer-h5dm6u"
                  data-border="true"
                  data-framer-name="Divider"
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color": "var(--token-773240fd-3518-4816-8026-d74555f02613, rgb(108, 113, 121))",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "dashed",
                    "--border-top-width": "1px",
                  }}
                ></div>
              </div>
              <div
                className="framer-rhkdjp"
                data-framer-component-type="RichTextContainer"
                style={{
                  "--extracted-r6o4lv": "var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17))",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  transform: "none",
                }}
              >
                <p
                  className="framer-text framer-styles-preset-102nmc1"
                  data-styles-preset="EehHjyAgq"
                  dir="auto"
                  style={{
                    "--framer-text-alignment": "left",
                    "--framer-text-color": "var(--extracted-r6o4lv, var(--token-fcdd5164-bf55-48ca-a517-fc569e2d93cc, rgb(17, 17, 17)))",
                  }}
                >
                  “Sourabh has a rare ability to turn abstract ideas into a website that feels clear, confident, and genuinely premium. The frontend build was fast, polished, and incredibly easy for our team to maintain.”
                </p>
              </div>
            </div>
          </div>
          <div className="framer-1l0q9pj" data-framer-appear-id="1l0q9pj" data-framer-name="Visual" style={{ opacity: "1", transform: "none" }}>
            <div className="ssr-variant">
              <div className="framer-13gmec1">
                <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                  <img
                    decoding="async"
                    width="1232"
                    height="928"
                    src="/images/PORTRAIT.png"
                    alt="Sourabh Chouhan, Frontend Developer"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      cornerShape: "inherit",
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
