"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Work", href: "#work", mobileHidden: true },
  { label: "About", href: "#about", mobileHidden: true },
  { label: "Resume", href: "/Resume.pdf", external: true, mobileHidden: false },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 2.2 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 opacity-0 transition-all duration-700 ${
        scrolled ? "nav-blur" : ""
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-site mx-auto px-8 md:px-12 lg:pl-4 lg:pr-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="font-heading text-text-primary font-semibold text-base tracking-widest uppercase hover:color-accent transition-colors duration-300"
            aria-label="Madhan — Home"
          >
            M.
          </a>

          {/* Links */}
          <ul className="flex items-center gap-8 md:gap-10" role="list">
            {navLinks.map((link) => (
              <li key={link.label} className={link.mobileHidden ? "hidden md:block" : ""}>
                <a
                  href={link.href}
                  onClick={link.href.startsWith("#") ? (e) => handleAnchorClick(e, link.href) : undefined}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="label-text text-text-secondary hover:text-text-primary transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
