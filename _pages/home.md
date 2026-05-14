---
layout: none
permalink: /
title: "Chuanhui Liu"
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chuanhui Liu</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png?v=20260328">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png?v=20260328">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon/favicon-96x96.png?v=20260328">
  <link rel="manifest" href="/assets/images/favicon/site.webmanifest?v=20260328">
  <link rel="shortcut icon" href="/assets/images/favicon/favicon.ico?v=20260328">
  <meta name="theme-color" content="#0f172a">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080c14;
      --panel: rgba(8, 15, 35, 0.52);
      --panel-border: rgba(255, 255, 255, 0.1);
      --accent: #60a5fa;
      --accent-2: #38bdf8;
      --highlight: #fbbf24;
      --text: #f5efe0;
      --muted: #e4d5c3;
      --grid: rgba(255, 255, 255, 0.03);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background: #080c14 url('/assets/images/video_posterio.png') center / cover no-repeat;
      height: 100vh;
      overflow: hidden;
    }

    #hero-video {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
      filter: saturate(1.5) brightness(1.05);
    }

    #hero-overlay {
      position: fixed;
      inset: 0;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.62) 0%,
        rgba(0, 0, 0, 0.30) 55%,
        rgba(0, 0, 0, 0.05) 100%
      );
      z-index: 0;
      pointer-events: none;
    }

    #matrix-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0;
      pointer-events: none;
    }

    .page {
      position: relative;
      z-index: 1;
      padding: 0;
      max-width: 1200px;
      margin: 0 auto;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 999px;
      font-weight: 600;
      text-decoration: none;
      color: var(--text);
      border: 1px solid var(--panel-border);
      background: rgba(0, 0, 0, 0.02);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn--accent {
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.12), rgba(56, 189, 248, 0.08));
      border-color: rgba(96, 165, 250, 0.38);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
    }

    .panel {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
      backdrop-filter: blur(8px);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }

    .panel:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(96, 165, 250, 0.22);
      border-color: rgba(96, 165, 250, 0.32);
    }

    .hero-panel:hover,
    .about-section:hover {
      transform: none;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
      border-color: rgba(96, 165, 250, 0.25);
    }

    .hero {
      position: relative;
      width: 100vw;
      left: 50%;
      transform: translateX(-50%);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 0 96px 50px;
      margin: 0;
      min-height: calc(100vh - 56px);
    }

    .hero-inner {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 640px;
    }

    .hero__eyebrow {
      font-family: "IBM Plex Mono", monospace;
      font-size: clamp(0.7rem, 1.1vw, 0.88rem);
      letter-spacing: 0.04em;
      color: rgba(255, 235, 195, 0.55);
      font-weight: 400;
      margin-bottom: 20px;
      padding-left: 14px;
      border-left: 2px solid #f36458;
      line-height: 1.65;
    }

    .hero__eyebrow-lead {
      color: #dedbc8;
      font-weight: 600;
      font-size: clamp(0.88rem, 1.35vw, 1.08rem);
      letter-spacing: 0.06em;
    }

    .hero__eyebrow-dot {
      color: #f36458;
      font-size: 0.55rem;
      flex-shrink: 0;
    }

    .hero__title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4.8rem);
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: #ffffff;
      font-weight: 400;
      margin-bottom: 12px;
    }

    .hero__roles {
      font-family: "IBM Plex Mono", monospace;
      font-size: clamp(0.9rem, 1.4vw, 1.15rem);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #ffffff;
      font-weight: 400;
      margin-bottom: 32px;
    }

    .hero__subtitle {
      font-family: "IBM Plex Mono", monospace;
      font-size: clamp(0.8rem, 1.2vw, 0.95rem);
      letter-spacing: 0.02em;
      color: rgba(255, 235, 195, 0.8);
      font-weight: 400;
      margin-bottom: 40px;
      min-height: 1.6em;
      white-space: nowrap;
      overflow: hidden;
    }

    #hero-roles-typed.no-cursor::after {
      display: none;
    }

    #hero-role-tags.show-cursor::after {
      content: '';
      display: inline-block;
      width: 2px;
      height: 0.85em;
      background: #f36458;
      margin-left: 3px;
      vertical-align: middle;
      animation: cursor-blink 0.75s step-end infinite;
    }

    .hero__subtitle::after,
    #hero-roles-typed::after {
      content: '';
      display: inline-block;
      width: 2px;
      height: 0.85em;
      background: #f36458;
      margin-left: 3px;
      vertical-align: middle;
      animation: cursor-blink 0.75s step-end infinite;
    }

    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }

    .cta-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .cta-primary {
      display: inline-flex;
      align-items: center;
      gap: 15px;
      padding: 6px 6px 6px 25px;
      border-radius: 999px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.94rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0a0a0a;
      background: #dedbc8;
      border: none;
      text-decoration: none;
      transition: gap 0.25s ease, transform 0.15s;
    }

    .cta-primary:hover {
      gap: 23px;
      transform: translateY(-1px);
    }

    .cta-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #0a0a0a;
      color: #dedbc8;
      font-size: 1.3rem;
      flex-shrink: 0;
      transition: transform 0.25s ease;
    }

    .cta-primary:hover .cta-arrow {
      transform: scale(1.12);
    }

    .cta-ghost {
      display: inline-flex;
      align-items: center;
      padding: 11px 24px;
      border-radius: 999px;
      font-family: "IBM Plex Sans", -apple-system, sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      color: rgba(255, 240, 210, 0.9);
      background: transparent;
      border: 1px solid rgba(255, 240, 210, 0.3);
      text-decoration: none;
      letter-spacing: 0.01em;
      transition: border-color 0.2s, color 0.2s, transform 0.15s;
    }

    .cta-ghost:hover {
      border-color: rgba(255, 240, 210, 0.7);
      color: #fff8ee;
      transform: translateY(-1px);
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .page-cta {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
      padding: 32px 20px 0;
    }

    .metric {
      padding: 16px;
      border-radius: 12px;
      background: rgba(10, 15, 28, 0.6);
      border: 1px solid rgba(120, 140, 180, 0.2);
    }

    .metric__label {
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .metric__value {
      font-size: 1.8rem;
      font-weight: 600;
    }

    .section-row {
      display: grid;
      gap: 20px;
      margin-top: 10px;
      grid-template-columns: repeat(3, 1fr);
    }

    .section-row--2col {
      grid-template-columns: repeat(2, 1fr);
    }

    .section-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-card h3 {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .section-card p {
      color: var(--muted);
      line-height: 1.6;
    }

    .section-card ul {
      color: var(--muted);
      line-height: 1.5;
      padding-inline-start: 0.5rem;
      font-size: 0.88rem;
    }

    .section-card li {
      margin-bottom: 0.25rem;
    }

    .chart-title {
      font-size: 0.95rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
    }

    .chart {
      width: 100%;
      height: 200px;
    }

    .map-frame {
      width: 100%;
      aspect-ratio: 16 / 9;
      height: auto;
      min-height: 220px;
      max-height: 320px;
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      overflow: hidden;
      background: rgba(10, 15, 28, 0.6);
    }

    .map-frame iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    .map-note {
      margin-top: 10px;
      color: var(--muted);
      font-size: 0.85rem;
    }

    .nodes {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .node {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 12px rgba(37, 99, 235, 0.45);
      animation: float 6s ease-in-out infinite;
    }

    .node:nth-child(2) { background: var(--highlight); animation-duration: 7s; }
    .node:nth-child(3) { background: var(--accent-2); animation-duration: 8s; }
    .node:nth-child(4) { animation-duration: 5.5s; }

    .node::after {
      content: "";
      position: absolute;
      inset: -14px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    @keyframes float {
      0%, 100% { transform: translate3d(0, 0, 0); }
      50% { transform: translate3d(12px, -10px, 0); }
    }

    .timeline {
      display: grid;
      gap: 12px;
    }

    .timeline__item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .timeline__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-2);
      box-shadow: 0 0 10px rgba(8, 145, 178, 0.45);
      flex-shrink: 0;
      margin-top: 5px;
    }

    .timeline__text {
      font-size: 0.95rem;
      color: var(--muted);
    }

    .footer-note {
      position: fixed;
      bottom: 20px;
      left: 0;
      right: 0;
      color: rgba(255, 240, 210, 0.45);
      font-size: 0.8rem;
      text-align: center;
      pointer-events: none;
    }

    /* ---- Tag pills ---- */
    .tag-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .tag-group__label {
      font-size: 0.75rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tag {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 500;
      background: rgba(96, 165, 250, 0.1);
      border: 1px solid rgba(96, 165, 250, 0.28);
      color: var(--accent);
      line-height: 1.6;
    }

    /* ---- Role projects ---- */
    .hero__roles {
      font-family: "IBM Plex Mono", monospace;
      font-size: clamp(0.9rem, 1.4vw, 1.15rem);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #ffffff;
      font-weight: 400;
      margin-bottom: 8px;
    }

    .hero__role-extras {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: flex-start;
      column-gap: 6px;
      row-gap: 8px;
      height: 3.8rem;
      overflow: hidden;
      margin-bottom: 24px;
    }

    .rp-connector {
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 235, 195, 0.45);
      opacity: 0;
      transition: opacity 0.4s ease;
      white-space: nowrap;
    }

    .rp-connector.visible { opacity: 1; }

    .rp-tag {
      display: inline-block;
      padding: 3px 11px;
      border-radius: 999px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: #f36458;
      border: 1px solid #f36458;
      color: #ffffff;
      line-height: 1.7;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }

    .rp-tag.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ---- Role name highlight ---- */
    .hero__role-name {
      color: #dedbc8;
    }

    /* ---- Greeting ---- */
    .hero__greeting {
      font-family: "Great Vibes", cursive;
      font-size: clamp(1.6rem, 2.8vw, 2.2rem);
      color: rgba(255, 240, 210, 0.82);
      margin-bottom: 18px;
      letter-spacing: 0.03em;
    }

    @media (max-width: 600px) {
      .hero {
        padding: 80px 5vw 0;
      }
    }
  </style>
</head>
<body>
  <video id="hero-video" autoplay loop muted poster="/assets/images/video_posterio.png">
    <source src="/assets/videos/video.mp4" type="video/mp4">
  </video>
  <div id="hero-overlay"></div>
  <canvas id="matrix-canvas"></canvas>
  <main class="page">
    <section class="hero">
      <div class="hero-inner">
        <p class="hero__greeting">Welcome, friends!</p>
        <h1 class="hero__title">I'm Chuanhui Liu</h1>
        <p class="hero__roles">I'm a <span id="hero-roles-typed"></span></p>
        <div class="hero__role-extras"><span id="hero-role-tags"></span></div>
        <p class="hero__eyebrow"><span class="hero__eyebrow-lead">When Science meets AI</span><br>— Answers are many, insight is rare, and truth is scarce.<br>— Demos are cheap, reliability is expensive, and experience is hard-earned.</p>
        <div class="cta-row">
          <a class="cta-primary" href="/about/">About Me <span class="cta-arrow">&#8594;</span></a>
        </div>
      </div>
    </section>

    <div class="footer-note">© 2026 Chuanhui Liu. All rights reserved.</div>
  </main>

  <script>
    // Typewriter for hero roles
    (function () {
      const el = document.getElementById('hero-roles-typed');
      const tagsEl = document.getElementById('hero-role-tags');
      if (!el) return;
      const roles = [
        ['Research Statistician', ', specializing in'],
        ['Machine Learning Scientist', ', focused on'],
        ['Forward Deployed Engineer', ', engaged in'],
      ];
      const projects = [
        ['Probalisitic Methods', 'Causal Inference', 'Metrics & Evaluation'],
        ['Latent Generative Models', 'Foundation Models', 'Model/Dataset Distillation'],
        ['Agentic Engineering', 'Workflow Automation', 'AI-native Tooling'],
      ];
      let ri = 0, ci = 0, deleting = false;

      function showProjects(index) {
        el.classList.add('no-cursor');
        if (tagsEl) {
          tagsEl.innerHTML = projects[index]
            .map(function (p) { return '<span class="rp-tag">' + p + '</span>'; })
            .join(' ');
          Array.from(tagsEl.querySelectorAll('.rp-tag')).forEach(function (t, i) {
            setTimeout(function () { t.classList.add('visible'); }, i * 80);
          });
          tagsEl.classList.add('show-cursor');
        }
      }

      function hideProjects() {
        el.classList.remove('no-cursor');
        if (tagsEl) {
          tagsEl.classList.remove('show-cursor');
          Array.from(tagsEl.querySelectorAll('.rp-tag')).forEach(function (t) {
            t.classList.remove('visible');
          });
        }
      }

      function tick() {
        const name = roles[ri][0], desc = roles[ri][1];
        const full = name + desc;
        const text = deleting ? full.slice(0, ci--) : full.slice(0, ci++);
        const nameLen = name.length;
        if (text.length <= nameLen) {
          el.innerHTML = '<span class="hero__role-name">' + text + '</span>';
        } else {
          el.innerHTML = '<span class="hero__role-name">' + name + '</span>' + text.slice(nameLen);
        }
        if (!deleting && ci > full.length) {
          showProjects(ri);
          setTimeout(function () { hideProjects(); setTimeout(function () { deleting = true; tick(); }, 300); }, 4000);
          return;
        }
        if (deleting && ci < 0) {
          deleting = false;
          ci = 0;
          ri = (ri + 1) % roles.length;
        }
        setTimeout(tick, deleting ? 22 : 40);
      }
      tick();
    })();

    // Resume video on bfcache restore (back/forward navigation only).
    // F5 hard reloads are handled by the autoplay attribute — do NOT call
    // play() here on a fresh load, it races the network request and breaks it.
    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      var video = document.getElementById('hero-video');
      if (video && video.paused) {
        video.play().catch(function () {
          video.muted = true;
          video.play();
        });
      }
    });
  </script>
</body>
</html>
