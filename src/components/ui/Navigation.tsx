"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "/Resume.pdf", external: true },
];

const mobileMenuLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [menuOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileLink = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
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

          {/* Desktop links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-10" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
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

          {/* Mobile fries icon — hidden on desktop */}
          <button
            className="md:hidden flex flex-col justify-between bg-transparent border-0 p-0 cursor-pointer text-text-secondary hover:text-text-primary transition-colors duration-300"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ width: "20px", height: "14px" }}
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="butt"
              aria-hidden="true"
            >
              <line x1="0" y1="1"  x2="20" y2="1"  />
              <line x1="8" y1="7"  x2="20" y2="7"  />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden absolute right-8 top-full"
        style={{
          background: "var(--canvas)",
          border: "1px solid var(--border-subtle)",
          minWidth: "148px",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {mobileMenuLinks.map((link, i) => (
            <li
              key={link.label}
              style={{
                borderBottom:
                  i < mobileMenuLinks.length - 1
                    ? "1px solid var(--border-subtle)"
                    : "none",
              }}
            >
              <button
                onClick={() => handleMobileLink(link.href)}
                className="w-full text-left px-6 py-4 label-text text-text-secondary hover:text-text-primary transition-colors duration-300 cursor-pointer bg-transparent border-0"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
