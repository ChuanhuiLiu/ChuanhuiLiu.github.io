---
title: ""
permalink: /portfolio/
layout: splash
author_profile: false
---

<style>
  /* === Horizontal Accordion === */

  .acc-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: clamp(400px, 60vh, 620px);
    width: 96%;
    max-width: 1240px;
    margin: 40px auto 0;
  }

  .acc-panel {
    position: relative;
    flex: 0 0 64px;
    flex-grow: 0;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: flex-grow 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .acc-panel.active {
    flex-grow: 1;
    cursor: default;
  }

  /* ── Backgrounds ── */
  .acc-panel__bg {
    position: absolute;
    inset: 0;
  }

  .acc-panel--projects .acc-panel__bg {
    background: #ffffff;
    border: 1px solid rgba(251, 191, 36, 0.35);
  }

  .acc-panel--notebooks .acc-panel__bg {
    background: #ffffff;
    border: 1px solid rgba(96, 165, 250, 0.35);
  }

  .acc-panel--tools .acc-panel__bg {
    background: #ffffff;
    border: 1px solid rgba(139, 92, 246, 0.35);
  }

  .acc-panel--cat .acc-panel__bg {
    background: #ffffff;
    border: 1px solid rgba(251, 113, 133, 0.35);
  }

  .acc-panel:hover .acc-panel__bg,
  .acc-panel.active .acc-panel__bg {
    /* handled per-panel below */
  }

  .acc-panel--projects:hover .acc-panel__bg,
  .acc-panel--projects.active .acc-panel__bg {
    border-color: rgba(251, 191, 36, 0.6);
    box-shadow: 0 8px 32px rgba(251, 191, 36, 0.12);
  }

  .acc-panel--notebooks:hover .acc-panel__bg,
  .acc-panel--notebooks.active .acc-panel__bg {
    border-color: rgba(96, 165, 250, 0.6);
    box-shadow: 0 8px 32px rgba(96, 165, 250, 0.12);
  }

  .acc-panel--tools:hover .acc-panel__bg,
  .acc-panel--tools.active .acc-panel__bg {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.12);
  }

  .acc-panel--cat:hover .acc-panel__bg,
  .acc-panel--cat.active .acc-panel__bg {
    border-color: rgba(251, 113, 133, 0.6);
    box-shadow: 0 8px 32px rgba(251, 113, 133, 0.12);
  }

  /* ── Collapsed tab (vertical label) ── */
  .acc-tab {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    opacity: 1;
    transition: opacity 0.18s ease;
  }

  .acc-panel.active .acc-tab {
    opacity: 0;
    pointer-events: none;
  }

  .acc-tab__icon {
    font-size: 1.3rem;
    line-height: 1;
  }

  .acc-tab__title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.88rem;
    font-weight: 700;
    color: #4b5563;
    letter-spacing: 0.14em;
    white-space: nowrap;
  }

  /* ── Expanded content ── */
  .acc-content {
    position: absolute;
    inset: 0;
    z-index: 2;
    padding: 32px 28px 26px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.28s ease 0.22s;
    min-width: 260px;
    overflow: hidden;
  }

  .acc-panel.active .acc-content {
    opacity: 1;
    pointer-events: auto;
  }

  .acc-content__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-shrink: 0;
  }

  .acc-content__icon {
    font-size: 1.8rem;
    line-height: 1;
  }

  .acc-content__title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #111827;
    margin: 0;
    letter-spacing: -0.02em;
  }

  /* ── List ── */
  .acc-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: hidden;
  }

  .acc-list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: #374151;
    font-size: 0.86rem;
    font-weight: 500;
    background: #f9fafb;
    border: 1px solid rgba(0, 0, 0, 0.07);
    white-space: nowrap;
    overflow: hidden;
    /* animation start state */
    opacity: 0;
    transform: translateX(-14px);
    transition: background 0.15s ease, color 0.15s ease,
                opacity 0.35s ease, transform 0.35s ease;
  }

  /* ── Iterative item colors (consistent across all panels) ── */
  .acc-list-item:nth-child(1) { border-left: 3px solid rgba(251, 191,  36, 0.7); }
  .acc-list-item:nth-child(2) { border-left: 3px solid rgba( 96, 165, 250, 0.7); }
  .acc-list-item:nth-child(3) { border-left: 3px solid rgba(139,  92, 246, 0.7); }
  .acc-list-item:nth-child(4) { border-left: 3px solid rgba(251, 113, 133, 0.7); }

  .acc-panel.active .acc-list-item               { opacity: 1; transform: translateX(0); }
  .acc-panel.active .acc-list-item:nth-child(1)  { transition-delay: 0.30s; }
  .acc-panel.active .acc-list-item:nth-child(2)  { transition-delay: 0.36s; }
  .acc-panel.active .acc-list-item:nth-child(3)  { transition-delay: 0.42s; }
  .acc-panel.active .acc-list-item:nth-child(4)  { transition-delay: 0.48s; }

  .acc-list-item:hover {
    background: rgba(251, 191, 36, 0.1);
    color: #fbbf24;
    text-decoration: none;
    border-color: rgba(251, 191, 36, 0.25);
  }

  .acc-list-item__name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .acc-list-item__date {
    font-size: 0.73rem;
    color: #9ca3af;
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 8px;
  }

  .acc-list-empty {
    font-size: 0.85rem;
    color: #9ca3af;
    padding: 6px 0;
    opacity: 0;
    transition: opacity 0.3s ease 0.3s;
  }

  .acc-panel.active .acc-list-empty { opacity: 1; }

  /* ── CTA ── */
  .acc-content__cta {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    padding: 8px 20px;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #92610a;
    background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(251, 191, 36, 0.45);
    text-decoration: none;
    width: fit-content;
    opacity: 0;
    transform: translateY(6px);
    transition: background 0.2s ease,
                opacity 0.3s ease 0.58s,
                transform 0.3s ease 0.58s;
  }

  .acc-panel.active .acc-content__cta {
    opacity: 1;
    transform: translateY(0);
  }

  .acc-content__cta:hover {
    background: rgba(251, 191, 36, 0.24);
    color: #92610a;
    text-decoration: none;
  }

  .acc-panel--notebooks .acc-content__cta {
    color: #1d4ed8;
    background: rgba(96, 165, 250, 0.1);
    border-color: rgba(96, 165, 250, 0.4);
  }

  .acc-panel--notebooks .acc-content__cta:hover {
    background: rgba(96, 165, 250, 0.2);
    color: #1d4ed8;
  }

  .acc-panel--notebooks .acc-list-item:hover {
    background: rgba(96, 165, 250, 0.08);
    color: #1d4ed8;
    border-color: rgba(96, 165, 250, 0.25);
  }

  .acc-panel--tools .acc-content__cta {
    color: #6d28d9;
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.4);
  }

  .acc-panel--tools .acc-content__cta:hover {
    background: rgba(139, 92, 246, 0.2);
    color: #6d28d9;
  }

  .acc-panel--tools .acc-list-item:hover {
    background: rgba(139, 92, 246, 0.08);
    color: #6d28d9;
    border-color: rgba(139, 92, 246, 0.25);
  }

  .acc-panel--cat .acc-content__cta {
    color: #be185d;
    background: rgba(251, 113, 133, 0.1);
    border-color: rgba(251, 113, 133, 0.4);
  }

  .acc-panel--cat .acc-content__cta:hover {
    background: rgba(251, 113, 133, 0.2);
    color: #be185d;
  }

  .acc-panel--cat .acc-list-item:hover {
    background: rgba(251, 113, 133, 0.08);
    color: #be185d;
    border-color: rgba(251, 113, 133, 0.25);
  }

  .acc-panel--notebooks .acc-list-item {
    white-space: normal;
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
  }

  .acc-list-item__excerpt {
    font-size: 0.76rem;
    color: #9ca3af;
    line-height: 1.45;
    font-weight: 400;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .acc-list-item__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  /* ── Mobile: vertical stack ── */
  @media (max-width: 640px) {
    .acc-container {
      flex-direction: column;
      height: auto;
    }

    .acc-panel {
      flex: none;
      border-radius: 14px;
      min-height: 58px;
      transition: min-height 0.5s ease;
    }

    .acc-panel.active {
      flex-grow: 0;
      min-height: 340px;
    }

    .acc-tab {
      flex-direction: row;
      justify-content: flex-start;
      padding: 0 20px;
    }

    .acc-tab__title {
      writing-mode: horizontal-tb;
      transform: none;
    }

    .acc-content {
      padding: 58px 20px 20px;
    }
  }

  /* ── Dark mode ── */
  [data-theme="dark"] .acc-panel--projects .acc-panel__bg,
  [data-theme="dark"] .acc-panel--notebooks .acc-panel__bg,
  [data-theme="dark"] .acc-panel--tools .acc-panel__bg,
  [data-theme="dark"] .acc-panel--cat .acc-panel__bg {
    background: rgba(255, 255, 255, 0.03);
  }

  [data-theme="dark"] .acc-panel--projects .acc-panel__bg         { border-color: rgba(251, 191,  36, 0.25); }
  [data-theme="dark"] .acc-panel--notebooks .acc-panel__bg        { border-color: rgba( 96, 165, 250, 0.25); }
  [data-theme="dark"] .acc-panel--tools .acc-panel__bg            { border-color: rgba(139,  92, 246, 0.25); }
  [data-theme="dark"] .acc-panel--cat .acc-panel__bg              { border-color: rgba(251, 113, 133, 0.25); }

  [data-theme="dark"] .acc-panel--projects:hover .acc-panel__bg,
  [data-theme="dark"] .acc-panel--projects.active .acc-panel__bg  { border-color: rgba(251, 191,  36, 0.55); box-shadow: 0 8px 32px rgba(251, 191,  36, 0.08); }
  [data-theme="dark"] .acc-panel--notebooks:hover .acc-panel__bg,
  [data-theme="dark"] .acc-panel--notebooks.active .acc-panel__bg { border-color: rgba( 96, 165, 250, 0.55); box-shadow: 0 8px 32px rgba( 96, 165, 250, 0.08); }
  [data-theme="dark"] .acc-panel--tools:hover .acc-panel__bg,
  [data-theme="dark"] .acc-panel--tools.active .acc-panel__bg     { border-color: rgba(139,  92, 246, 0.55); box-shadow: 0 8px 32px rgba(139,  92, 246, 0.08); }
  [data-theme="dark"] .acc-panel--cat:hover .acc-panel__bg,
  [data-theme="dark"] .acc-panel--cat.active .acc-panel__bg       { border-color: rgba(251, 113, 133, 0.55); box-shadow: 0 8px 32px rgba(251, 113, 133, 0.08); }

  [data-theme="dark"] .acc-tab__title     { color: #9ca3af; }
  [data-theme="dark"] .acc-content__title { color: #f3f4f6; }

  [data-theme="dark"] .acc-list-item {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.08);
    color: #d1d5db;
  }

  [data-theme="dark"] .acc-list-item__date    { color: #6b7280; }
  [data-theme="dark"] .acc-list-item__excerpt { color: #6b7280; }

  [data-theme="dark"] .acc-panel--projects .acc-list-item:hover  { background: rgba(251, 191,  36, 0.08); color: #fcd34d; border-color: rgba(251, 191,  36, 0.3); }
  [data-theme="dark"] .acc-panel--notebooks .acc-list-item:hover { background: rgba( 96, 165, 250, 0.08); color: #93c5fd; border-color: rgba( 96, 165, 250, 0.3); }
  [data-theme="dark"] .acc-panel--tools .acc-list-item:hover     { background: rgba(139,  92, 246, 0.08); color: #c4b5fd; border-color: rgba(139,  92, 246, 0.3); }
  [data-theme="dark"] .acc-panel--cat .acc-list-item:hover       { background: rgba(251, 113, 133, 0.08); color: #fda4af; border-color: rgba(251, 113, 133, 0.3); }

  [data-theme="dark"] .acc-content__cta                  { color: #fcd34d; background: rgba(251, 191,  36, 0.08); border-color: rgba(251, 191,  36, 0.3); }
  [data-theme="dark"] .acc-panel--notebooks .acc-content__cta { color: #93c5fd; background: rgba( 96, 165, 250, 0.08); border-color: rgba( 96, 165, 250, 0.3); }
  [data-theme="dark"] .acc-panel--tools .acc-content__cta     { color: #c4b5fd; background: rgba(139,  92, 246, 0.08); border-color: rgba(139,  92, 246, 0.3); }
  [data-theme="dark"] .acc-panel--cat .acc-content__cta       { color: #fda4af; background: rgba(251, 113, 133, 0.08); border-color: rgba(251, 113, 133, 0.3); }
</style>

<div class="acc-container" id="acc">

  <!-- ── Projects Panel ── -->
  <div class="acc-panel acc-panel--projects active">
    <div class="acc-panel__bg"></div>
    <div class="acc-tab">
      <span class="acc-tab__icon">🗂️</span>
      <span class="acc-tab__title">Projects</span>
    </div>
    <div class="acc-content">
      <div class="acc-content__header">
        <span class="acc-content__icon">🗂️</span>
        <h2 class="acc-content__title">Projects</h2>
      </div>
      <div class="acc-list">
        {% assign portfolio_items = site.portfolio | sort: "date" | reverse %}
        {% if portfolio_items.size > 0 %}
          {% for item in portfolio_items limit:4 %}
          <a class="acc-list-item" href="{{ item.url }}">
            <span class="acc-list-item__name">{{ item.title }}</span>
          </a>
          {% endfor %}
        {% else %}
          <div class="acc-list-empty">No projects yet — check back soon.</div>
        {% endif %}
      </div>
      <a class="acc-content__cta" href="/projects/">View all projects →</a>
    </div>
  </div>

  <!-- ── Notebooks Panel ── -->
  <div class="acc-panel acc-panel--notebooks">
    <div class="acc-panel__bg"></div>
    <div class="acc-tab">
      <span class="acc-tab__icon">📓</span>
      <span class="acc-tab__title">Notebooks</span>
    </div>
    <div class="acc-content">
      <div class="acc-content__header">
        <span class="acc-content__icon">📓</span>
        <h2 class="acc-content__title">Notebooks</h2>
      </div>
      <div class="acc-list">
        {% assign notebook_items = site.posts | where_exp: "p", "p.categories contains 'Notebooks'" | sort: "date" | reverse %}
        {% if notebook_items.size > 0 %}
          {% for item in notebook_items limit:4 %}
          <a class="acc-list-item" href="{{ item.url }}">
            <div class="acc-list-item__meta">
              <span class="acc-list-item__name">{{ item.title }}</span>
              <span class="acc-list-item__date">{{ item.date | date: "%b %Y" }}</span>
            </div>
            {% if item.excerpt %}<span class="acc-list-item__excerpt">{{ item.excerpt | strip_html | truncate: 100 }}</span>{% endif %}
          </a>
          {% endfor %}
        {% else %}
          <div class="acc-list-empty">No notebooks yet — check back soon.</div>
        {% endif %}
      </div>
      <a class="acc-content__cta" href="/notes/">View all notebooks →</a>
    </div>
  </div>

  <!-- ── AI Tools Panel ── -->
  <div class="acc-panel acc-panel--tools">
    <div class="acc-panel__bg"></div>
    <div class="acc-tab">
      <span class="acc-tab__icon">🤖</span>
      <span class="acc-tab__title">AI Tools</span>
    </div>
    <div class="acc-content">
      <div class="acc-content__header">
        <span class="acc-content__icon">🤖</span>
        <h2 class="acc-content__title">AI Tools</h2>
      </div>
      <div class="acc-list">
        {% assign tool_items = site.tools | sort: "date" | reverse %}
        {% if tool_items.size > 0 %}
          {% for item in tool_items limit:4 %}
          <a class="acc-list-item" href="{{ item.url }}">
            <span class="acc-list-item__name">{{ item.title }}</span>
          </a>
          {% endfor %}
        {% else %}
          <div class="acc-list-empty">No tools yet — check back soon.</div>
        {% endif %}
      </div>
      <a class="acc-content__cta" href="/tools/">View all tools →</a>
    </div>
  </div>

  <!-- ── Fridge the Cat Panel ── -->
  <div class="acc-panel acc-panel--cat">
    <div class="acc-panel__bg"></div>
    <div class="acc-tab">
      <span class="acc-tab__icon">🐱</span>
      <span class="acc-tab__title">Fridge</span>
    </div>
    <div class="acc-content">
      <div class="acc-content__header">
        <span class="acc-content__icon">🐱</span>
        <h2 class="acc-content__title">Fridge</h2>
      </div>
      <div class="acc-list">
        <div class="acc-list-empty" style="opacity:1;">Photos & stories coming soon 🐾</div>
      </div>
    </div>
  </div>

</div>

<script>
  (function () {
    var panels = document.querySelectorAll('#acc .acc-panel');

    function activate(panel) {
      panels.forEach(function (p) { p.classList.remove('active'); });
      panel.classList.add('active');
    }

    panels.forEach(function (panel) {
      panel.addEventListener('mouseenter', function () {
        activate(panel);
      });
    });
  })();

  // Sync data-theme with the site's dark-mode toggle
  (function () {
    function applyTheme() {
      var isDark = sessionStorage.getItem('theme') === 'dark' ||
                   (document.getElementById('theme_source') &&
                    document.getElementById('theme_source').getAttribute('rel') !== 'stylesheet');
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }

    applyTheme();

    var toggle = document.querySelector('.dark-mode__toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        // fire after the existing handler has updated sessionStorage
        setTimeout(applyTheme, 20);
      });
    }
  })();
</script>
