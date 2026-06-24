"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    number: "01",
    name: "Bloom",
    tagline: "Luxury Plant & Home Décor Website",
    description:
      "A premium botanical lifestyle website blending luxury home décor with indoor plant aesthetics. Designed and developed from concept to deployment with refined typography, responsive layouts, and subtle scroll-based interactions.",
    role: "UX/UI Designer & Frontend Developer",
    tools: ["Figma", "Next.js", "Tailwind CSS"],
    link: "https://bloom-living.vercel.app/",
    linkLabel: "View Website",
    image: "/projects/bloom.png",
    accent: "#C49A6C",
    bgPattern: "radial-gradient(ellipse at 70% 40%, rgba(196, 154, 108, 0.06) 0%, transparent 60%)",
  },
  {
    number: "02",
    name: "Local Play",
    tagline: "Sports Matchmaking Mobile App",
    description:
      "A mobile app concept that helps solo players discover, join, and organize local sports matches. Designed around community, match discovery, player profiles, ratings, and simple coordination between players.",
    role: "UX/UI Designer",
    tools: ["Figma", "Adobe Photoshop"],
    link: "https://www.behance.net/gallery/250921393/Local-Play-Mobile-App-Concept-UIUX-Design?platform=direct",
    linkLabel: "View Case Study",
    image: "/projects/localplay.png",
    accent: "#A89F91",
    bgPattern: "radial-gradient(ellipse at 30% 60%, rgba(168, 159, 145, 0.05) 0%, transparent 60%)",
  },
  {
    number: "03",
    name: "Zudio App Concept",
    tagline: "Fashion E-Commerce Mobile Experience",
    description:
      "A conceptual mobile shopping experience for Zudio focused on improving product discovery, browsing, filtering, and checkout. Designed to make fashion shopping faster, clearer, and more intuitive for everyday users.",
    role: "UX/UI Designer",
    tools: ["Figma", "Adobe Photoshop"],
    link: "https://www.behance.net/gallery/230204483/Zudio-App-Concept?platform=direct",
    linkLabel: "View Case Study",
    image: "/projects/zudio.png",
    accent: "#C49A6C",
    bgPattern: "radial-gradient(ellipse at 60% 30%, rgba(196, 154, 108, 0.05) 0%, transparent 55%)",
  },
  {
    number: "04",
    name: "Apple Music Heuristic Evaluation",
    tagline: "UX Audit Based On Nielsen's Heuristics",
    description:
      "A usability evaluation of Apple Music using Nielsen's 10 Heuristics. The case study identifies UX issues, friction points, and improvement opportunities across core user flows.",
    role: "UX Researcher",
    tools: ["Figma", "Nielsen's Heuristics"],
    link: "https://www.behance.net/gallery/229164367/Heuristic-Evaluation-of-Apple-Music",
    linkLabel: "View Case Study",
    image: "/projects/applemusic.png",
    accent: "#A89F91",
    bgPattern: "radial-gradient(ellipse at 40% 70%, rgba(168, 159, 145, 0.04) 0%, transparent 55%)",
  },
];

function ProjectChapter({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const chapterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => chapterRef.current?.querySelector(sel) ?? null;
      const trigger = chapterRef.current;
      const isEven = index % 2 === 0;

      gsap.fromTo(q(".proj-number"), { opacity: 0 }, {
        opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      gsap.fromTo(q(".proj-name"), { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger, start: "top 75%", once: true },
      });

      gsap.fromTo(q(".proj-tagline"), { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger, start: "top 72%", once: true },
      });

      gsap.fromTo(q(".proj-visual"), {
        opacity: 0, y: 40, scale: 0.97, x: isEven ? 30 : -30,
      }, {
        opacity: 1, y: 0, scale: 1, x: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger, start: "top 70%", once: true },
      });

      const details = chapterRef.current?.querySelectorAll(".proj-detail");
      if (details) {
        gsap.fromTo(details, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger, start: "top 65%", once: true },
        });
      }
    }, chapterRef);

    return () => ctx.revert();
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={chapterRef}
      className="relative py-24 md:py-32 border-b border-border-subtle last:border-b-0"
      style={{ background: project.bgPattern }}
    >
      <div className="max-w-site mx-auto px-8 md:px-12 lg:px-16">
        <p className="proj-number project-number mb-6 opacity-0">{project.number}</p>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
            !isEven ? "lg:grid-flow-dense" : ""
          }`}
        >
          <div className={!isEven ? "lg:col-start-2" : ""}>
            <h3
              className="proj-name text-display-md text-text-primary font-heading font-bold mb-4 opacity-0"
              style={{ lineHeight: "1.05" }}
            >
              {project.name}
            </h3>

            <p
              className="proj-tagline font-body text-text-secondary mb-8 opacity-0"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)", letterSpacing: "0.04em" }}
            >
              {project.tagline}
            </p>

            <div className="hr-subtle mb-8" />

            <p
              className="proj-detail font-body text-text-secondary leading-relaxed mb-8 opacity-0"
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: "1.8" }}
            >
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="proj-detail opacity-0">
                <p className="label-text text-text-secondary mb-1.5">Role</p>
                <p className="font-body text-text-primary text-sm">{project.role}</p>
              </div>
              <div className="proj-detail opacity-0">
                <p className="label-text text-text-secondary mb-1.5">Tools</p>
                <p className="font-body text-text-primary text-sm">{project.tools.join(" • ")}</p>
              </div>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-detail inline-flex items-center gap-3 text-sm font-heading font-medium opacity-0 cursor-pointer group"
              style={{ color: project.accent, letterSpacing: "0.06em" }}
              aria-label={`${project.linkLabel} — ${project.name}`}
            >
              <span>{project.linkLabel}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: "0.85rem" }}>
                →
              </span>
            </a>
          </div>

          {/* Project thumbnail */}
          <div className={`proj-visual opacity-0 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            <div
              className="relative rounded-[10px] overflow-hidden group/thumb"
              style={{
                aspectRatio: "4/3",
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Image
                src={project.image}
                alt={`${project.name} — ${project.tagline}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 45vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-[1.03]"
                quality={100}
              />
              {/* Subtle dark overlay to blend image into the dark canvas */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.35) 100%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => sectionRef.current?.querySelector(sel) ?? null;

      gsap.fromTo(q(".work-header"), { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="pt-section" aria-label="Selected Work">
      <div className="max-w-site mx-auto px-8 md:px-12 lg:px-16">
        <div className="work-header flex items-center gap-6 mb-0 opacity-0">
          <span className="label-text text-text-secondary">03 — Selected Work</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
      </div>

      {projects.map((project, index) => (
        <ProjectChapter key={project.number} project={project} index={index} />
      ))}
    </section>
  );
}
