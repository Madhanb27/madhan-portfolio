"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Load animation timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      const lines = headlineRef.current?.querySelectorAll(".headline-line");
      if (lines) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
            duration: 1.1, stagger: 0.12, ease: "power4.out",
          },
          "-=0.3"
        );
      }

      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.2"
      );

      const dot = scrollIndicatorRef.current?.querySelector(".scroll-dot") ?? null;
      gsap.to(dot, {
        y: 8, duration: 1.4, ease: "power2.inOut", repeat: -1, yoyo: true, delay: 3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cursor ambient glow
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section) return;

    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });

    let fadeTimer: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      moveX(e.clientX - rect.left);
      moveY(e.clientY - rect.top);
      gsap.to(glow, { opacity: 1, duration: 0.5, overwrite: "auto" });
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        gsap.to(glow, { opacity: 0, duration: 1.4, ease: "power2.out", overwrite: "auto" });
      }, 1600);
    };

    const onLeave = () => {
      clearTimeout(fadeTimer);
      gsap.to(glow, { opacity: 0, duration: 1.0, ease: "power2.out", overwrite: "auto" });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[87vh] flex flex-col justify-center pt-20"
      style={{ isolation: "isolate", overflow: "hidden" }}
      aria-label="Introduction"
    >
      <div className="max-w-site mx-auto px-8 md:px-12 lg:pl-4 lg:pr-16 w-full">
        <div className="max-w-5xl">
          <p ref={labelRef} className="label-text text-accent mb-5 opacity-0">
            UX / UI Designer
          </p>

          <h1
            ref={headlineRef}
            className="text-display-xl text-text-primary font-heading font-bold mb-5 md:mb-6"
            style={{ lineHeight: "0.95" }}
          >
            <span className="headline-line block overflow-hidden opacity-0">Hi,</span>
            <span className="headline-line block overflow-hidden opacity-0">
              I&apos;m <span className="color-accent">Madhan.</span>
            </span>
          </h1>

          <p
            ref={subRef}
            className="text-text-secondary font-body max-w-2xl leading-relaxed opacity-0"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: "1.75" }}
          >
            Turning ideas into intuitive experiences through research,
            design, and curiosity.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-5 mt-8 opacity-0">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-accent text-canvas font-heading font-semibold text-sm tracking-wide rounded-sm transition-all duration-500 hover:bg-[#D4A97C] hover:shadow-[0_0_30px_rgba(196,154,108,0.25)] cursor-pointer"
            >
              View Work
              <span className="text-xs">→</span>
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-border-subtle text-text-secondary font-heading font-medium text-sm tracking-wide rounded-sm transition-all duration-500 hover:border-accent hover:text-text-primary cursor-pointer"
            >
              Download Resume
              <span className="text-xs">{"↗︎"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        aria-hidden="true"
      >
        <span className="label-text text-text-secondary" style={{ fontSize: "0.6rem" }}>Scroll</span>
        <div className="w-px h-10 bg-border-subtle relative overflow-hidden">
          <div className="scroll-dot absolute top-0 left-0 right-0 h-3 bg-accent" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(10, 10, 10, 0.6))" }}
        aria-hidden="true"
      />

      {/* Cursor ambient glow — z-index: -1 keeps it behind all content */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: "640px",
          height: "640px",
          background: "radial-gradient(circle, rgba(196,154,108,0.10) 0%, rgba(196,154,108,0.04) 45%, transparent 70%)",
          filter: "blur(55px)",
          willChange: "transform, opacity",
          zIndex: -1,
        }}
      />
    </section>
  );
}
