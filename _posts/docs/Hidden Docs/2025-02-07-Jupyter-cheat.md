---
title: "Cheatsheet： RMarkdown vs Jupyter Notebook"
hidden: true
---

### Cheatsheet for RMarkdown and Jupyter Notebook
RMarkdown share the almost Markdown syntax of Jupyter Notebook. [Pandoc_Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown)

However, the following feature are different.

| Feature | RMarkdown `.Rmd` | Jupyter Notebook `.ipynb` |
|------------|------------------------|--------------------------------|
| **Add Code trunk** | code wrap ```$$\{r\}$$  | add from menu |
| **Name Code trunk** | add `name` in wrap  | --- |
| **Suppress all output** | `results="hide"` | `%%capture` |
| **Suppress function return** | --- | `;` |
| **Hide Warnings** | `warning = FALSE` | `warnings.filterwarnings('ignore')` |
| **Skipp Execution** | `eval=FALSE` | `%%script false` |
| **Hide Code but Show Output** | `echo=FALSE` | --- |
| **Hide Both Code and Output** | `include=FALSE` | --- |
| **Combine Both Code and Output** | `collapse=TRUE` | --- |
| **View Global Variables** | Environment Tab | `%who` |
| **Run Shell Command** | system() | `!` |
| **Convert Format** | `jupytext --to notebook ` | `jupytext --to rmarkdown ` |
