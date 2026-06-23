"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MyStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => sectionRef.current?.querySelector(sel) ?? null;
      const trigger = sectionRef.current;

      const paragraphs = sectionRef.current?.querySelectorAll(".story-para");
      if (paragraphs) {
        gsap.fromTo(paragraphs, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger, start: "top 75%", once: true },
        });
      }

      gsap.fromTo(q(".section-label"), { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      gsap.fromTo(q(".story-headline"), { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger, start: "top 75%", once: true },
      });

      gsap.fromTo(q(".story-accent"), { opacity: 0, scaleX: 0 }, {
        opacity: 1, scaleX: 1, duration: 0.8, ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger, start: "top 65%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-section px-8 md:px-12 lg:px-16"
      aria-label="My Story"
    >
      <div className="max-w-site mx-auto">
        <div className="flex items-center gap-6 mb-20">
          <span className="section-label label-text text-text-secondary opacity-0">02 — My Story</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="story-headline text-display-md text-text-primary font-heading font-bold leading-tight opacity-0">
              Designed by{" "}
              <span className="color-accent">curiosity.</span>
              <br />
              Refined by{" "}
              <span style={{ color: "var(--text-secondary)" }}>craft.</span>
            </h2>

            <div
              className="story-accent mt-10 opacity-0"
              style={{ width: "48px", height: "2px", background: "var(--accent)" }}
            />

            <p className="story-para label-text text-text-secondary mt-8 opacity-0">
              Turning questions
              <br />
              into experiences.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-7">
            <p className="story-para font-body text-text-secondary leading-relaxed opacity-0"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: "1.85" }}>
              My journey into design started with a simple question: why do some digital
              experiences feel effortless while others feel frustrating?
            </p>

            <p className="story-para font-body text-text-secondary leading-relaxed opacity-0"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: "1.85" }}>
              That curiosity eventually led me to UX/UI design. As a Computer Science
              graduate of 2026, I became increasingly interested in understanding how
              people interact with products and how thoughtful design can make those
              interactions more intuitive and meaningful.
            </p>

            <p className="story-para font-body text-text-secondary leading-relaxed opacity-0"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: "1.85" }}>
              Through projects like Bloom, Local Play, Zudio App Concept, and an Apple
              Music Heuristic Evaluation, I&apos;ve explored different design challenges while
              continuously developing my skills in research, problem-solving, wireframing,
              prototyping, and interface design.
            </p>

            <p className="story-para font-body text-text-secondary leading-relaxed opacity-0"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: "1.85" }}>
              I believe good design goes beyond aesthetics. It&apos;s about understanding
              users, solving real problems, and creating experiences that feel natural
              and purposeful.
            </p>

            <p className="story-para font-body leading-relaxed opacity-0"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: "1.85", color: "var(--text-primary)" }}>
              As a designer at the beginning of my journey, I&apos;m constantly learning,
              refining my craft, and looking for opportunities to grow through meaningful
              work and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
