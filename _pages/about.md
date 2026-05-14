---
title: "About Me"
permalink: /about/
layout: single
author_profile: true
---

<style>
  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
    margin-bottom: 16px;
  }

  .tag {
    display: inline-block;
    padding: 3px 11px;
    border-radius: 999px;
    font-size: 0.80rem;
    font-weight: 500;
    background: rgba(96, 165, 250, 0.1);
    border: 1px solid rgba(96, 165, 250, 0.35);
    color: #2563eb;
    line-height: 1.6;
  }

  .tag--gold {
    background: rgba(217, 119, 6, 0.08);
    border-color: rgba(217, 119, 6, 0.3);
    color: #b45309;
  }

  .tag--green {
    background: rgba(6, 148, 162, 0.08);
    border-color: rgba(6, 148, 162, 0.3);
    color: #0e7490;
  }

  .about-section-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
    margin-bottom: 6px;
    margin-top: 20px;
  }

  .timeline {
    border-left: 2px solid #d1d5db;
    padding-left: 20px;
    margin: 8px 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .timeline__item {
    position: relative;
  }

  .timeline__item::before {
    display: none;
  }

  .timeline__icon {
    position: absolute;
    left: -36px;
    top: 24px;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    object-fit: contain;
  }

  .timeline__school {
    display: inline-block;
    margin-bottom: 4px;
    padding: 2px 9px;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .timeline__school--purdue {
    background: rgba(206, 184, 136, 0.15);
    border: 1px solid rgba(206, 184, 136, 0.5);
    color: #9a7d3a;
  }

  .timeline__school--nankai {
    background: rgba(107, 45, 139, 0.1);
    border: 1px solid rgba(107, 45, 139, 0.35);
    color: #6b2d8b;
  }

  .timeline__period {
    font-size: 0.78rem;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 2px;
  }

  .timeline__title {
    font-weight: 600;
    font-size: 0.95rem;
    color: inherit;
    margin-bottom: 2px;
  }

  .timeline__sub {
    font-size: 0.88rem;
    color: #6b7280;
  }

  .scholar-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #1a56db;
    background: rgba(96, 165, 250, 0.08);
    border: 1px solid rgba(96, 165, 250, 0.35);
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }

  .scholar-link:hover {
    background: rgba(96, 165, 250, 0.16);
    border-color: rgba(96, 165, 250, 0.6);
    color: #1e40af;
  }

  .scholar-link svg {
    flex-shrink: 0;
  }
</style>

Welcome to my homepage! My name is Chuanhui Liu (刘川辉). Currently, I am a Contract AI Scientist at Data and Statistical Science (DSS), Abbvie, combining advanced quantitative methods with automation to turn complex data into reliable, actionable insight for high-stakes decision making in clinical R&D and drug development. Prior to that, I earned my Ph.D. in Statistics from Purdue University, where I had the opportunity to conduct research in probabilistic machine learning, optimal transport, and scalable Bayesian inference.

In my spare time, I enjoy “cooking” things — from dangerously spicy Sichuan-style food and consumer electronics to side research projects.

### Education

<div class="timeline">
  <div class="timeline__item">
    <img class="timeline__icon" src="https://www.google.com/s2/favicons?domain=purdue.edu&sz=32" alt="Purdue">
    <div class="timeline__period">Aug. 2019 – Dec. 2025</div>
    <div class="timeline__title">Ph.D in Statistics & Machine Learning - Purdue University</div>
    <div class="timeline__sub"> Advisor: <a href="https://www.stat.purdue.edu/~wangxiao/">Dr. Xiao Wang</a></div>
    <div class="timeline__sub" style="font-size: 0.78rem;">Dissertation: <a href="https://hammer.purdue.edu/articles/thesis/VARIATIONAL_INFERENCE_FOR_ROBUST_SEMI-SUPERVISED_AND_SCALABLE_LEARNING/30837236">Variational inference for robust, semi-supervised, and scalable learning</a></div>
  </div>
  <div class="timeline__item">
    <img class="timeline__icon" src="https://www.google.com/s2/favicons?domain=purdue.edu&sz=32" alt="Purdue">
    <div class="timeline__period">Aug. 2017 – May. 2019</div>
    <div class="timeline__title">M.S. in Statistics - Purdue University</div>
  </div>
    <div class="timeline__item">
    <img class="timeline__icon" src="https://upload.wikimedia.org/wikipedia/en/a/a5/Nankai_University_logo.svg" alt="Nankai">
    <div class="timeline__period">Aug. 2012 – May. 2016</div>
    <div class="timeline__title">B.S. in Applied Mathematics - Nankai University</div>
  </div>
</div>

---

### Research Interests

<div class="tag-row">
  <span class="tag">Bayesian Inference</span>
  <span class="tag">Survival Analysis</span>
  <span class="tag">Probalistic Methods</span>
  <span class="tag">Causal Inference</span>
</div>
<div class="tag-row">
  <span class="tag tag--green">Machine Learning Theory</span>
  <span class="tag tag--green">Information Theory</span>
  <span class="tag tag--green">Optimal Transport</span>
</div>
<div class="tag-row">
  <span class="tag tag--gold">Interactive Web Apps</span>
  <span class="tag tag--gold">LLM Evaluation</span>
  <span class="tag tag--gold">Agentic Workflows</span>
</div>

---

### Publications

<a class="scholar-link" href="https://scholar.google.com/citations?user=_8YRuSsAAAAJ&hl=en" target="_blank" rel="noopener">
  <img src="https://www.google.com/s2/favicons?domain=scholar.google.com&sz=32" width="16" height="16" alt="Google Scholar" style="vertical-align:middle;">
  View on Google Scholar
</a>

