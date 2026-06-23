"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    label: "Research",
    description:
      "Understanding users, goals, and pain points before designing solutions.",
  },
  {
    number: "02",
    label: "Structure",
    description:
      "Organizing information and user flows into a clear foundation.",
  },
  {
    number: "03",
    label: "Design",
    description:
      "Turning ideas into intuitive interfaces through thoughtful design decisions.",
  },
  {
    number: "04",
    label: "Prototype",
    description:
      "Testing interactions and validating ideas before development.",
  },
  {
    number: "05",
    label: "Refine",
    description:
      "Improving details through feedback, testing, and iteration.",
  },
];

export default function HowIThink() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => sectionRef.current?.querySelector(sel) ?? null;
      const trigger = sectionRef.current;

      gsap.fromTo(q(".process-header"), { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      gsap.fromTo(q(".process-headline"), { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger, start: "top 75%", once: true },
      });

      const stepItems = sectionRef.current?.querySelectorAll(".process-step");
      if (stepItems) {
        gsap.fromTo(stepItems, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.14, ease: "power3.out",
          scrollTrigger: {
            trigger: q(".steps-container"),
            start: "top 75%",
            once: true,
          },
        });
      }

      const connectors = sectionRef.current?.querySelectorAll(".step-connector");
      if (connectors) {
        gsap.fromTo(connectors, { scaleY: 0, opacity: 0 }, {
          scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.14, ease: "power2.out",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: q(".steps-container"),
            start: "top 70%",
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
      aria-label="How I Think"
    >
      <div className="max-w-site mx-auto">
        <div className="process-header flex items-center gap-6 mb-20 opacity-0">
          <span className="label-text text-text-secondary">04 — How I Think</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h2
              className="process-headline text-display-md text-text-primary font-heading font-bold opacity-0"
              style={{ lineHeight: "1.1" }}
            >
              Design is a{" "}
              <span className="color-accent">process,</span>
              <br />
              not a moment.
            </h2>
            <p
              className="mt-8 font-body text-text-secondary leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: "1.8", maxWidth: "42ch" }}
            >
              My process combines UX/UI design and frontend thinking — transforming ideas into experiences that are both intuitive and functional.
            </p>
          </div>

          <div className="steps-container space-y-0">
            {steps.map((step, index) => (
              <div key={step.number}>
                <div className="process-step flex gap-6 items-start opacity-0">
                  <div className="flex flex-col items-center" style={{ minWidth: "32px" }}>
                    <div
                      className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ border: "1px solid var(--border-subtle)", background: "var(--surface)" }}
                    >
                      <span
                        className="font-heading font-semibold"
                        style={{ fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.1em" }}
                      >
                        {step.number}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className="step-connector w-px mt-2 opacity-0"
                        style={{ height: "48px", background: "var(--border-subtle)" }}
                      />
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <p
                      className="font-heading font-semibold text-text-primary mb-2"
                      style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", letterSpacing: "-0.01em" }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="font-body text-text-secondary leading-relaxed"
                      style={{ fontSize: "0.9rem", lineHeight: "1.75" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
