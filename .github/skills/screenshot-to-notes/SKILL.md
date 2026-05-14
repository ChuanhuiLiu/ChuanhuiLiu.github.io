---
name: screenshot-to-notes
description: "Use when: reading a screenshot, image, or photo and generating a structured Jekyll notes/handbook post in the style of _posts/docs/. Triggers on: 'generate notes from screenshot', 'turn this image into a post', 'add notes from screenshot', 'create a post from this image'."
---

# Screenshot → Notes Post

Convert an attached screenshot (or any image showing lecture slides, textbook pages, diagrams, terminal output, or paper excerpts) into a fully formatted Jekyll post matching the style of `_posts/docs/2025-02-07-MLE.md`.

## Inputs

| Input | How to Provide |
|-------|---------------|
| Screenshot / image | Attach to the chat message (drag-and-drop or paste) |
| Category | Tell me the category, or I'll infer it (e.g. Handbooks, Notes, Tutorial) |
| Post title | Optional — I'll derive one from the content if not given |

## Workflow

### Step 1 — Read the image
Examine all visible text, diagrams, code, equations, and structure in the attached image(s). Identify:
- Main topic / subject
- Key concepts, definitions, theorems, or steps
- Code snippets (if any)
- Section hierarchy

### Step 2 — Draft content
Expand the raw extracted content into polished markdown:
- **Lead paragraph**: one-sentence summary of what the note covers and who it's for
- **Sections with `##` headings**: one per major concept or logical group
- **Bullet lists** for properties, steps, comparisons
- **Inline math** with `$...$` and display math with `$$...$$` for equations (MathJax enabled)
- **Code blocks** with language tags (```python, ```r, etc.)
- Keep prose concise — favor clarity over length

### Step 3 — Build frontmatter
Produce YAML frontmatter matching this template exactly:

```yaml
---
title: "<Derived or user-supplied title>"
excerpt: "<One sentence describing the note, ≤ 20 words>"
header:
  teaser: assets/images/gif/tutorial.gif
author_profile: true
permalink: /:categories/:title/
breadcrumbs: true
last_modified_at: <YYYY-MM-DD today's date>
categories:
  - <Category>
---
```

### Step 4 — Choose filename
Format: `YYYY-MM-DD-<slug>.md`  
- Use today's date
- Slug: lowercase, hyphen-separated, derived from title (e.g. `bayesian-inference-basics`)

### Step 5 — Write the file
Save to `_posts/docs/<filename>.md` using the create_file or replace tool.

### Step 6 — Confirm
Report:
- File path created
- Title and category used
- Section headings in the generated post

## Output Format Reference

```
---
title: "Bayesian Inference Basics"
excerpt: "Core concepts of Bayesian inference for statisticians new to probabilistic programming."
header:
  teaser: assets/images/gif/tutorial.gif
author_profile: true
permalink: /:categories/:title/
breadcrumbs: true
last_modified_at: 2026-03-16
categories:
  - Handbooks
---

One-paragraph context-setting intro here.

## Prior, Likelihood, and Posterior

Key relationships and intuition ...

$$p(\theta \mid x) \propto p(x \mid \theta)\, p(\theta)$$

## Conjugate Families

...
```

## Rules
- Never fabricate content not present in the screenshot — expand and explain, but do not invent facts
- Always use MathJax delimiters (`$` / `$$`) for equations, never LaTeX `\(...\)` wrappers
- Do not add a `gallery:` block unless the user explicitly provides image paths
- Preserve any code exactly as shown in the screenshot; annotate it with comments if helpful
