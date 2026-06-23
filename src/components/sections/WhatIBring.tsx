"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const capabilities = [
  {
    title: "User Research",
    description: "Understanding user needs through research, observation, and usability testing.",
  },
  {
    title: "Product Thinking",
    description: "Balancing user needs, business goals, and practical constraints to create meaningful digital experiences.",
  },
  {
    title: "Wireframing",
    description: "Transforming ideas into clear structures and user flows before moving into visual design.",
  },
  {
    title: "UI Design",
    description: "Designing intuitive interfaces with thoughtful hierarchy, typography, spacing, and consistency.",
  },
  {
    title: "Prototyping",
    description: "Creating interactive prototypes to test ideas, validate decisions, and improve usability.",
  },
  {
    title: "Design Systems",
    description: "Building reusable components and scalable design patterns for consistent user experiences.",
  },
];

export default function WhatIBring() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => sectionRef.current?.querySelector(sel) ?? null;
      const trigger = sectionRef.current;

      gsap.fromTo(q(".bring-header"), { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      gsap.fromTo(q(".bring-headline"), { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger, start: "top 75%", once: true },
      });

      const cards = sectionRef.current?.querySelectorAll(".capability-card");
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: q(".capabilities-grid"),
            start: "top 75%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-section px-8 md:px-12 lg:px-16"
      style={{ background: "var(--surface)" }}
      aria-label="What I Bring"
    >
      <div className="max-w-site mx-auto">
        <div className="bring-header flex items-center gap-6 mb-20 opacity-0">
          <span className="label-text text-text-secondary">05 — What I Bring</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div className="mb-16">
          <h2
            className="bring-headline text-display-md text-text-primary font-heading font-bold opacity-0"
            style={{ lineHeight: "1.1", maxWidth: "18ch" }}
          >
            Capabilities that{" "}
            <span className="color-accent">move work</span>{" "}
            forward.
          </h2>
        </div>

        <div
          className="capabilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              className="capability-card group opacity-0 p-8 relative transition-colors duration-500 hover:bg-canvas cursor-default"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span
                className="label-text mb-6 block"
                style={{ color: "var(--accent)", opacity: 0.6 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-heading font-semibold text-text-primary mb-3 transition-colors duration-300"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", letterSpacing: "-0.01em" }}
              >
                {cap.title}
              </h3>
              <p
                className="font-body text-text-secondary leading-relaxed"
                style={{ fontSize: "0.875rem", lineHeight: "1.8" }}
              >
                {cap.description}
              </p>
              <div
                className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "var(--accent)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
