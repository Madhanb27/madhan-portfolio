"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const links = [
  { label: "Download Resume", href: "/Resume.pdf", external: true, isPrimary: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/connect-madhanb", external: true, isPrimary: false },
  { label: "Behance", href: "https://www.behance.net/madhanb4", external: true, isPrimary: false },
  { label: "GitHub", href: "https://github.com/Madhanb27", external: true, isPrimary: false },
  { label: "Get In Touch", href: "mailto:madhanwrk@gmail.com", external: true, isPrimary: false },
];

export default function FinalScene() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => sectionRef.current?.querySelector(sel) ?? null;
      const trigger = sectionRef.current;

      const headlineLines = sectionRef.current?.querySelectorAll(".final-line");
      if (headlineLines) {
        gsap.fromTo(headlineLines, { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }, {
          opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
          duration: 1.1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger, start: "top 75%", once: true },
        });
      }

      const linkItems = sectionRef.current?.querySelectorAll(".final-link");
      if (linkItems) {
        gsap.fromTo(linkItems, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger, start: "top 60%", once: true },
        });
      }

      const footerItems = sectionRef.current?.querySelectorAll(".footer-text");
      if (footerItems) {
        gsap.fromTo(footerItems, { opacity: 0 }, {
          opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: q(".footer-bar"), start: "top 90%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-section pb-16 px-8 md:px-12 lg:px-16"
      style={{
        background: "radial-gradient(ellipse at 50% 80%, rgba(196, 154, 108, 0.05) 0%, var(--canvas) 60%)",
      }}
      aria-label="Contact and closing"
    >
      <div className="max-w-site mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-20">
          <span className="label-text text-text-secondary">06 — Let&apos;s Connect</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* Main headline */}
        <h2
          className="text-display-lg text-text-primary font-heading font-bold mb-16"
          style={{ lineHeight: "1.05", maxWidth: "16ch" }}
        >
          <span className="final-line block overflow-hidden opacity-0">
            Let&apos;s create
          </span>
          <span className="final-line block overflow-hidden opacity-0">
            something{" "}
            <span className="color-accent">meaningful.</span>
          </span>
        </h2>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 md:gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`final-link inline-flex items-center gap-2.5 opacity-0 transition-all duration-400 cursor-pointer ${
                link.isPrimary
                  ? "px-7 py-3.5 bg-accent text-canvas font-heading font-semibold text-sm tracking-wide rounded-sm hover:bg-[#D4A97C] hover:shadow-[0_0_30px_rgba(196,154,108,0.2)]"
                  : "px-6 py-3 border border-border-subtle text-text-secondary font-body text-sm rounded-sm hover:border-accent hover:text-text-primary"
              }`}
            >
              {link.label}
              {link.external && <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>{"↗︎"}</span>}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-bar max-w-site mx-auto w-full pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-5 border-t border-border-subtle">
          <p
            className="footer-text font-heading font-semibold text-text-primary opacity-0"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)", letterSpacing: "0.08em" }}
          >
            MADHAN
          </p>
          <p
            className="footer-text label-text text-text-secondary opacity-0"
            style={{ letterSpacing: "0.1em" }}
          >
            © 2026 — Designed with intention
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196, 154, 108, 0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
