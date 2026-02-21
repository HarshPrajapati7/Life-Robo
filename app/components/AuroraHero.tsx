"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ChromaGrid, { type ChromaGridItem } from "./ui/ChromaGrid";
import FlyingPosters from "./ui/FlyingPosters";
import CardSwap, { Card } from "./ui/CardSwap";

const workFilters = ["All", "Rovers", "Line Followers", "Battle Bots", "Automation"];

const services = [
  { id: "01", title: "Robot Building Workshops", featured: true },
  { id: "02", title: "Coding & Automation Sessions", featured: false },
  { id: "03", title: "Competition Training & Strategy", featured: false },
  { id: "04", title: "Community & Mentorship Programs", featured: false },
];

const processSteps = [
  "Join the Club",
  "Design & Prototype",
  "Build & Program",
  "Test and Compete",
];

const overYears = [
  "VEX Robotics",
  "FIRST Tech",
  "Arduino",
  "ROS",
  "OpenCV",
  "National Finals",
];

const projectHighlights = [
  {
    title: "Autonomous Rover Build",
    description: "Terrain-aware rover with sensor fusion, waypoint logic, and obstacle avoidance.",
  },
  {
    title: "Line-Following Bot Challenge",
    description: "High-speed PID tuning and IR sensor calibration for track stability.",
  },
  {
    title: "Battle Bots Season Entry",
    description: "Custom chassis, impact-tolerant mechanics, and competition strategy drills.",
  },
];

const testimonials = [
  {
    name: "Amit Chauhan",
    role: "Head",
    quote: "Best hands-on experience in engineering.",
  },
  {
    name: "Harsh Prajapati",
    role: "Software Team Lead",
    quote: "We built robots that competed at national championships!",
  },
  {
    name: "Vineeta",
    role: "Circuit Designing Lead",
    quote:
      "Students quickly move from ideas to working prototypes with clear mentorship and real practice.",
  },
];

const workshopBanner = "/photos/workshop-today-banner.jpeg";

const whatsappImages = Array.from({ length: 17 }, (_, i) => {
  const index = String(i + 1).padStart(2, "0");
  return `/photos/workshop-whatsapp-${index}.jpeg`;
});

const repoEventImages = [
  "/photos/repo/repo-event-workshop-2026.png",
  "/photos/repo/repo-event-roboeminence.jpg",
  "/photos/repo/repo-event-lecture-series.jpg",
  "/photos/repo/repo-event-workshop-main.jpg",
  "/photos/repo/repo-workshop-01.jpg",
  "/photos/repo/repo-workshop-02.jpg",
  "/photos/repo/repo-workshop-03.jpg",
  "/photos/repo/repo-workshop-04.jpg",
  "/photos/repo/repo-workshop-05.jpg",
  "/photos/repo/repo-workshop-06.jpg",
  "/photos/repo/repo-workshop-07.jpg",
  "/photos/repo/repo-workshop-08.jpg",
  "/photos/repo/repo-workshop-09.jpg",
  "/photos/repo/repo-workshop-10.jpg",
  "/photos/repo/repo-workshop-11.jpg",
  "/photos/repo/repo-lecture-03.jpg",
  "/photos/repo/repo-lecture-06.jpg",
  "/photos/repo/repo-lecture-09.jpg",
];

const memberPlaceholderImage = "/photos/member-placeholder.svg";

const blogs = [
  {
    title: "Workshop Inauguration Highlights",
    date: "Feb 21, 2026",
    image: repoEventImages[0],
  },
  {
    title: "Hands-on Build and Debug Sessions",
    date: "Feb 21, 2026",
    image: repoEventImages[8],
  },
  {
    title: "Talk on Career in Space: Key Takeaways",
    date: "Feb 21, 2026",
    image: repoEventImages[2],
  },
];

const heroShowcaseImages = [
  { src: repoEventImages[0], alt: "Robotics workshop inauguration poster" },
  { src: repoEventImages[1], alt: "Roboeminence event highlight" },
  { src: whatsappImages[0], alt: "Workshop activity snapshot" },
];

const galleryImages = [workshopBanner, ...repoEventImages, ...whatsappImages].map((src, idx) => ({
  src,
  alt: `Workshop and robotics moment ${idx + 1}`,
}));

const teamItems: ChromaGridItem[] = [
  {
    image: memberPlaceholderImage,
    title: "Amit Chauhan",
    subtitle: "Head",
    handle: "@amit_chauhan",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #020617)",
  },
  {
    image: memberPlaceholderImage,
    title: "Ahmad Tarique",
    subtitle: "Co-head",
    handle: "@ahmad_tarique",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #020617)",
  },
  {
    image: memberPlaceholderImage,
    title: "Harsh Prajapati",
    subtitle: "Software Team Lead",
    handle: "@harsh_prajapati",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(170deg, #8B5CF6, #020617)",
  },
  {
    image: memberPlaceholderImage,
    title: "Jatin Pandey",
    subtitle: "Software Team Co-lead",
    handle: "@jatin_pandey",
    borderColor: "#22D3EE",
    gradient: "linear-gradient(160deg, #22D3EE, #020617)",
  },
  {
    image: memberPlaceholderImage,
    title: "Vineeta",
    subtitle: "Circuit Designing Lead",
    handle: "@vineeta_circuits",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(170deg, #F59E0B, #020617)",
  },
  {
    image: memberPlaceholderImage,
    title: "Lakshya Soni",
    subtitle: "Circuit Designing Co-lead",
    handle: "@lakshya_soni",
    borderColor: "#F472B6",
    gradient: "linear-gradient(180deg, #F472B6, #020617)",
  },
];

const eventPosters = [
  workshopBanner,
  ...repoEventImages,
  ...whatsappImages,
];

const heroCardPositionClasses = [
  "left-[8%] top-[17%] rotate-[-14deg]",
  "left-1/2 top-[11%] z-20 -translate-x-1/2",
  "right-[8%] top-[17%] rotate-[14deg]",
];

export const AuroraHero = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="gc-site">
      <section className="border-b border-[#c9d8ff] bg-gradient-to-r from-[#f3f7ff] via-[#eaf1ff] to-[#f6f9ff]">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3cab]">
              Today&apos;s Notification
            </p>
            <p className="mt-1 text-sm font-medium text-[#0f1d49] sm:text-base">
              February 21, 2026: Workshop Inauguration and talk on career in space.
            </p>
          </div>
          <a
            href="https://life-robo.vercel.app/events/robotics-workshops-series-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border border-[#bfd0ff] bg-white shadow-[0_14px_30px_rgba(18,49,138,0.18)]"
          >
            <img
              src={workshopBanner}
              alt="Today workshop inauguration and career in space banner"
              className="h-28 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      <section id="top" className="global-creative-hero relative overflow-hidden">
        <div className="global-creative-grid pointer-events-none absolute inset-0 z-[1]" />
        <div className="global-creative-glow pointer-events-none absolute inset-0 z-[2]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.04fr] lg:gap-12">
            <div className="relative max-w-2xl pt-1 text-center lg:pt-8 lg:text-left">
              <p className="inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-100/90 lg:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-100" />
                Robotics Club
              </p>
              <h1 className="mt-6 text-[clamp(3.2rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-white">
                Innovate.
                <span className="block text-[#f3f8ff]">Build. Compete.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100/85 sm:text-lg lg:mx-0">
                Where Robots Are Built and Ideas Come Alive
              </p>

              <div className="mt-6 flex items-center justify-center gap-3 text-blue-100/85 lg:justify-start">
                <span className="text-xs tracking-[0.3em] text-amber-300">* * * * *</span>
                <span className="text-sm">120+ Active Builders</span>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] ring-1 ring-blue-200/10 transition hover:bg-black/90"
                >
                  Join the Robotics Club
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="#works"
                  className="inline-flex items-center justify-center rounded-full bg-white/22 px-7 py-3 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/30"
                >
                  Our Robots &amp; Projects
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[600px] lg:pt-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#050712]/92 p-6 shadow-[0_30px_90px_rgba(2,8,36,0.58)] sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_14%,rgba(236,72,153,0.28),transparent_42%),radial-gradient(circle_at_34%_74%,rgba(37,99,235,0.48),transparent_54%)]" />

                <p className="relative flex items-center text-sm text-white/85">
                  <span className="mr-2 text-lg leading-none">&bull;</span>Latest robotics showcase
                </p>

                <div className="relative mt-4 h-[430px] overflow-hidden rounded-[1.65rem] border border-white/12 bg-[radial-gradient(circle_at_30%_18%,rgba(59,130,246,0.34),transparent_48%),radial-gradient(circle_at_78%_82%,rgba(244,114,182,0.2),transparent_55%),linear-gradient(170deg,rgba(14,20,64,0.92)_0%,rgba(8,12,40,0.95)_68%,rgba(6,8,28,0.98)_100%)]">
                  {heroShowcaseImages.map((item, idx) => (
                    <article
                      key={item.src}
                      className={`creative-stack-card ${heroCardPositionClasses[idx]}`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="creative-card-media"
                        loading="lazy"
                      />
                    </article>
                  ))}
                </div>

                <div className="relative mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/18 bg-white/5 px-4 py-1.5 text-xs text-white/90">
                    Line Followers
                  </span>
                  <span className="rounded-full border border-white/18 bg-white/5 px-4 py-1.5 text-xs text-white/90">
                    Rover Systems
                  </span>
                  <button
                    type="button"
                    className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                    aria-label="Open showcase"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="relative mt-3 text-3xl font-medium text-white sm:text-[2.2rem]">
                  Club Build Highlights
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 border-t border-slate-300/60 pt-6 text-sm text-slate-700 sm:grid-cols-3 sm:text-[15px]">
            <p className="flex items-center gap-2">
              <span className="text-lg leading-none">&bull;</span>50+ Active Members
            </p>
            <p className="flex items-center gap-2 sm:justify-self-center">
              <span className="text-lg leading-none">&bull;</span>Weekly Build Sessions
            </p>
            <p className="flex items-center gap-2 sm:justify-self-end">
              <span className="text-lg leading-none">&bull;</span>Competition Ready Teams
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="gc-section gc-section-light">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div className="gc-orbit-placeholder">
            <img
              src={repoEventImages[5]}
              alt="Mobile robotics platform in workshop"
              className="gc-orbit-image"
              loading="lazy"
            />
            <span className="gc-orbit-caption">Mobile Robot Prototyping</span>
          </div>
          <div>
            <p className="gc-eyebrow">About Our Robotics Club</p>
            <h3 className="gc-heading-dark mt-3">
              A student-led robotics community that learns by building.
            </h3>
            <p className="gc-copy mt-4">
              We are a student-led robotics club where innovators learn engineering,
              coding, and teamwork to build competitive robots and explore future tech.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="gc-chip-dark">Hands-on Labs</span>
              <span className="gc-chip-dark">Mentor Guidance</span>
              <span className="gc-chip-dark">Competition Focused</span>
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="gc-section gc-section-light pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <p className="gc-eyebrow text-center">Our Robots &amp; Projects</p>
          <h3 className="gc-heading-dark mt-2 text-center">Build Portfolio</h3>

          <div className="mx-auto mt-8 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 rounded-full bg-[#eef0f8] p-2 shadow-inner">
            {workFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-3 text-sm transition ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-[#050914] via-[#1e3ec9] to-[#2447ff] text-white"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <article className="gc-work-card mt-10">
            <div className="gc-work-image-frame">
              <img
                src={repoEventImages[9]}
                alt="Battle bot robot ready for competition"
                className="gc-work-image"
                loading="lazy"
              />
            </div>
            <div className="gc-work-overlay">
              <p className="gc-eyebrow !text-blue-100/90">Competition Robot</p>
              <h4 className="mt-2 text-2xl font-semibold text-white">Autonomous Rover Build</h4>
              <p className="mt-3 text-sm text-blue-100/80">
                Modular rover architecture, route planning, and robust chassis integration.
              </p>
              <button type="button" className="gc-project-btn mt-6">
                View Project
              </button>
            </div>
          </article>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projectHighlights.map((project) => (
              <article key={project.title} className="gc-project-mini">
                <p className="text-xs uppercase tracking-[0.16em] text-blue-200/90">Project</p>
                <h4 className="mt-2 text-lg font-semibold text-white">{project.title}</h4>
                <p className="mt-2 text-sm text-blue-100/80">{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="gc-section gc-section-soft pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <p className="gc-eyebrow text-center">Gallery</p>
          <h3 className="gc-heading-dark mt-2 text-center">Build Sessions &amp; Robot Trials</h3>
          <div className="gc-gallery-grid mt-8">
            {galleryImages.map((image) => (
              <figure key={image.src} className="gc-gallery-item">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="gc-section gc-section-light pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mb-8">
            <p className="gc-eyebrow">Club Members &amp; Mentors</p>
            <h3 className="gc-heading-dark mt-2">Meet the Robotics Team</h3>
            <p className="gc-copy mt-3 max-w-2xl">
              Cross-functional builders handling mechanics, embedded systems, computer vision,
              and strategy for competitions.
            </p>
          </div>

          <div className="gc-team-grid-shell">
            <ChromaGrid
              items={teamItems}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
              columns={3}
              rows={2}
            />
          </div>
        </div>
      </section>

      <section className="gc-section gc-section-light pt-0">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-20">
          <div>
            <p className="gc-eyebrow">Build With Us</p>
            <h3 className="gc-heading-dark mt-2">Sign Up for Robotics Trials</h3>
            <p className="gc-copy mt-4 max-w-xl">
              Join practical sessions in electronics, CAD, embedded coding, and test-day simulation
              to prepare for real robotics challenges.
            </p>
            <button type="button" className="gc-dark-pill mt-6">
              Sign Up for Robotics Trials
            </button>
          </div>
          <div className="gc-stat-card">
            <p className="text-sm text-blue-100/80">Competition Podiums</p>
            <p className="mt-3 text-6xl font-semibold leading-none text-white">18+</p>
            <p className="mt-4 text-sm text-blue-100/80">
              League placements across line-following, rover navigation, and combat categories.
            </p>
          </div>
        </div>
      </section>

      <section className="gc-section gc-section-light pt-0">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20">
          <div>
            <p className="gc-eyebrow">Interactive Preview</p>
            <h3 className="gc-heading-dark mt-2">Robot Design Iterations</h3>
            <p className="gc-copy mt-4 max-w-xl">
              Scroll through concept stacks to review mechanical layout, wiring strategy,
              and control model updates.
            </p>
          </div>

          <div className="gc-card-swap-stage">
            <CardSwap
              cardDistance={54}
              verticalDistance={60}
              delay={5000}
              pauseOnHover={false}
              width={320}
              height={220}
            >
              <Card className="gc-swap-card">
                <h4>Card 01</h4>
                <p>Rover chassis concept</p>
              </Card>
              <Card className="gc-swap-card gc-swap-card-alt">
                <h4>Card 02</h4>
                <p>Sensor placement map</p>
              </Card>
              <Card className="gc-swap-card gc-swap-card-alt-2">
                <h4>Card 03</h4>
                <p>Control loop flow</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      <section id="services" className="gc-section gc-section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="gc-eyebrow !text-blue-200/80">Workshops &amp; Training</p>
          <h3 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Robotics Learning Tracks
          </h3>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className={service.featured ? "gc-service-card-featured" : "gc-service-card"}
              >
                <span className="gc-service-index">{service.id}</span>
                <h4 className="relative z-10 text-2xl font-medium text-white">{service.title}</h4>
                {service.featured ? (
                  <div className="gc-wave-lines" />
                ) : (
                  <p className="relative z-10 mt-3 max-w-xs text-sm text-slate-300/80">
                    Weekly sessions with practical assignments and mentor feedback.
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="gc-section gc-section-dark pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <article className="gc-events-card">
            <p className="gc-eyebrow !text-blue-200/80">Events</p>
            <h3 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Robotics Event Wall
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-blue-100/80">
              Competition snapshots, workshop moments, and live demo highlights from club activities.
            </p>

            <div className="gc-events-stage">
              <FlyingPosters
                items={eventPosters}
                planeWidth={320}
                planeHeight={320}
                distortion={3}
                scrollEase={0.01}
                cameraFov={45}
                cameraZ={20}
              />
            </div>
          </article>
        </div>
      </section>

      <section id="places" className="gc-section gc-section-dark pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <article className="gc-map-card">
            <p className="gc-eyebrow !text-blue-200/80 text-center">Lab Network</p>
            <h3 className="mt-2 text-center text-4xl font-semibold text-white sm:text-5xl">
              Explore Our Build Spaces
            </h3>
            <div className="gc-map-placeholder mt-10">
              <div className="gc-profile-node">
                <div className="gc-profile-avatar">
                  <img
                    src={repoEventImages[4]}
                    alt="Mentor profile"
                    className="gc-profile-avatar-img"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-white">Mentor Lab</p>
                <p className="text-xs text-blue-100/70">Remote Team Hub</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="gc-section gc-section-light pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <p className="gc-eyebrow">Workflow</p>
          <h3 className="gc-heading-dark mt-2">How We Build</h3>

          <div className="mt-7 grid gap-3 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <article key={step} className="gc-process-card">
                <span className="text-xs text-slate-500">Step {idx + 1}</span>
                <h4 className="mt-2 text-sm font-medium text-slate-800">{step}</h4>
              </article>
            ))}
          </div>

          <p className="gc-eyebrow mt-12">Trusted Over Years</p>
          <h3 className="gc-heading-dark mt-2">Learning Platforms and Competitions</h3>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {overYears.map((name) => (
              <div key={name} className="gc-logo-pill">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gc-section gc-section-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="gc-eyebrow text-center">Club Members &amp; Mentors</p>
          <h3 className="gc-heading-dark mt-2 text-center">What Our Team Says</h3>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <article key={item.name} className="gc-testimonial-card">
                <div className="gc-testimonial-avatar">
                  <img
                    src={galleryImages[index % galleryImages.length].src}
                    alt={`${item.name} avatar`}
                    className="gc-testimonial-avatar-img"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{item.quote}</p>
                <p className="mt-5 text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs" className="gc-section gc-section-light pt-0">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <p className="gc-eyebrow">From Blog</p>
          <h3 className="gc-heading-dark mt-2">Explore Robotics Logs</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog.title} className="gc-blog-card">
                <div className="gc-blog-image-frame">
                  <img src={blog.image} alt={blog.title} className="gc-blog-image" loading="lazy" />
                </div>
                <p className="mt-3 text-xs text-slate-500">{blog.date}</p>
                <h4 className="mt-1 text-lg font-medium text-slate-900">{blog.title}</h4>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1f42d9]"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="gc-footer">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="gc-eyebrow !text-blue-200/80">Connect with the Robotics Club</p>
          <h3 className="mt-2 text-5xl font-semibold text-white sm:text-6xl">Build With Us</h3>
          <p className="mt-4 max-w-2xl text-sm text-blue-100/80">
            Share your details and we will guide you to the right robotics track.
          </p>

          <form className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-blue-100/85">
              Name
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-blue-200/30 bg-[#0b1538]/90 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-200/70"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm text-blue-100/85">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-blue-200/30 bg-[#0b1538]/90 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-200/70"
                placeholder="you@example.com"
              />
            </label>
            <label className="text-sm text-blue-100/85 md:col-span-2">
              Interested in Robotics Skills or Competitions?
              <textarea
                className="mt-2 min-h-[120px] w-full rounded-xl border border-blue-200/30 bg-[#0b1538]/90 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-200/70"
                placeholder="Tell us your interests"
              />
            </label>
            <div className="md:col-span-2">
              <button type="button" className="gc-light-pill">
                Sign Up for Robotics Trials
              </button>
            </div>
          </form>

          <p className="mt-12 border-t border-white/10 pt-6 text-sm text-blue-100/70">
            &copy; Life Robo Robotics Club | Building Future Engineers
          </p>
        </div>
      </footer>
    </div>
  );
};
