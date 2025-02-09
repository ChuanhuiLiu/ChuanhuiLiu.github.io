---
title: "Make and Fix *Minimal Mistakes*"
last_modified_at: 2025-02-05
header:
  teaser: "/assets/images/illustration/MMISTAKES.png"
excerpt: "A step-by-step guide to building a personal website for beginners with no HTML or CSS background, featuring customization pro tips."
permalink: /:categories/:title/
breadcrumbs: true
categories:
  - Handbooks
tags:
  - Jekyll/HTML/CSS
  - Github
toc: true
---

As the first post, I outline the major steps in settting up a Jekyll website for academic research blog within a week. 

### 1. Introduction to Minimal Mistakes
If you're looking for a flexible, elegant, and efficient way to build a personal website, similar to mine, the [Minimal_Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme powered by [Jekyll](https://jekyllrb.com/) and [Ruby](https://www.ruby-lang.org/en/) is an excellent choice.  The website created through this approach can be hosted on Github pages or on a Google domain. 
#### 1.1 What is Minimal Mistakes?  
[Minimal_Mistakes](https://mmistakes.github.io/minimal-mistakes/) is a 100% free *two-column* feature-rich Jekyll theme designed for personal sites, blogs, and portfolios. It provides a clean and minimalist layout with built-in features like:  

- Sidebar & navigation customization  
- Various Layouts & Multi-author support  
- Automatic TOC and breadcrumbs UI
- Year, Tag, and Category organization  

A famous fork of Minimal Mistakes is [Academic_Pages](https://github.com/academicpages/academicpages.github.io), a simple tweak designed for acamedic professionals. However, as the progression of Minimal Mistakes, this fork turns to be outdated in my opinion.
#### 1.2 What is Jekyll and Ruby?  
[Jekyll](https://jekyllrb.com/) is a static site generator written in [Ruby](https://www.ruby-lang.org/en/), designed to convert Markdown and HTML files into a full-fledged website. Unlike traditional CMS platforms, Jekyll allows you to:  

- Build fast, lightweight static websites  
- Store content in simple Markdown files (no databases required)  
- Host effortlessly on GitHub Pages  

If you know RMarkdown or Jupyter notebook, posting blogs on Jekyll will feel natural!

$$ \begin{aligned} 
\text{Juypter} &= \text{Markdown}+\text{Python}; \\ 
\text{Rmarkdown} &= \text{Markdown}+\text{R} ;\\ 
\text{Jekyll} &= \text{Markdown}+\text{Html}.
\end{aligned}$$

Technically, **Jekyll is built with Ruby**,  and **Ruby gems** (similar to Python packages) allow you to manage and customize your site without the need for Conda or Pip. The file for package list in Ruby is called *Gemfile*. 

### 2. Getting Started Locally
We will need install **Ruby** to run it locally. There are a lot of youtube tutorials of installations that are easy to follow. I recommend [Spencer Pao's](https://www.youtube.com/watch?v=g6AJ9qPPoyc) and [CCB_program's](https://www.youtube.com/watch?v=8NkxcaxRacA) from UC Berkeley. Run the following code after you have ruby installed.

```r
gem install jekyll bundler

ruby -v
> ruby 3.3.7 (2025-01-15 revision be31f993d7) 
gem -v
> 3.5.22
```
Next, go ahead and **clone** a template repo from Minimal mistakes on Github to customize. A *simple* template is [here](https://github.com/mmistakes/mm-github-pages-starter), and an *all-in-one* is [here](https://github.com/mmistakes/minimal-mistakes). I recommend starting with a simple template to understand its basic structure. Once you have repo downloaded locally, go to your repo location and **run the following commands** to serve a local preview of your website

```r
cd my-website
bundle install
bundle exec jekyll serve
```
Click the prompt to access the local server: http://127.0.0.1:4000. If the page is shown correctly, you are all set for customizing! :clap:

The [official_guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/) of Minimal Mistakes is always the best referrence. If you use the simple template, you can download from [docs](https://github.com/mmistakes/minimal-mistakes/tree/master/docs/_posts) and unzip them to '_posts' folder to have a comprehensive list of sample pages.

### 3. Customization Tips
The `_config.yml` file is the main configuration file for your Jekyll site. Editing it allows you to customize the site's settings, appearance, and behavior without modifying core files. However, you need to re-run "bundle exec jekyll serve" to see the changes on `_config.yml`, as this file by design are not dynamically served.

In the following, I share some customizations that used in this website. 
#### 3.1 Enabling Latex(MathJax) Format 
I follow this [note](https://choimon.github.io/blog/mathjax-for-minimalmistakes-githubpage/) and this [answer](https://tex.stackexchange.com/questions/27633/mathjax-inline-mode-not-rendering) to render math equations via MathJax, a cross-browser JavaScript library that displays mathematical notation in web browsers, using MathML, LaTeX and ASCIIMathML markup. First, add the follow code to `_layout/default.html` before load script.html

```r
% include mathjax-custom.html %
```

Then, create a new file named `mathjax-custom.html` under `_includes` folder. This is the place where we add and customize the Mathjax support. The default setting of Mathjax does not allow inline-math. Thus, we use the following and escape normal \$ with `\$`.
```html
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
  });

  </script>
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
```


#### 3.2 Padding, Line Spacing, and Alignment
To find the Global attributes, press **F12** on the website to *inspect* elements and change the corresponding .scss file. For example, to change the margin, border, or padding of all clickable buttons. Find the _sass/_buttons.scss file and modify it. You may also want to temporarily change the behavior of a paragraph/column etc for a specific type of page. In these case, press F12 to inspect the class elements of a specific page, and modify the html files under _include or _layouts folder. 

You could modify the following:

- 2em Margins of the masthead and the page.
- setting of grid layout of category and tag in `_sass/_archive.scss`
- back-to-top line in the end of every section of `layout/post.html`
- Next, Previous button in the end of posts.


#### 3.3 Additional Author Information

The original icon does not include instituion and scholar links. So, I used the following command to add additional icons on the author page.
```html
author:
  name   : "Your Name"
  avatar : "/assets/images/bio-photo.png"
  bio    : Your Bio 
  location: "Your Location"
  links:
    - label: "Your Institution"
      icon: "fas fa-fw fa-graduation-cap"
      url: "#"
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: "mailto:liu2306@purdue.edu"
    - label: "Google Scholar"
      icon: "fab fa-fw fa-google-scholar"
      url: "https://scholar.google.nl/"
  linkedin: /youname
  github: /youraccount
logo: "/assets/images/logo.jpg"
```

#### 3.4 Toggle Dark Mode and Dark Skin

The [discussion](https://github.com/mmistakes/minimal-mistakes/discussions/2033) demonstrates an simple example of Dark skin toggler. However, there are two issues: 1) The button does not display a cursor effect when hovered over; 2) The button icon is not changed to moon when switching to dark mode. The following code resolve these two issues. Put the above code in style.html under _includes.


```html
<script>
  function dark_mode_btn_click() {
    var node1 = document.getElementById('theme_source');
    var node2 = document.getElementById('theme_source_2');
    if(node1.getAttribute('rel')=='stylesheet'){
      node2.setAttribute('rel', 'stylesheet');
      setTimeout(function(){
        node1.setAttribute('rel', 'stylesheet alternate');
      }, 10);
      sessionStorage.setItem('theme', 'dark');
      sessionStorage.setItem('icon', 'fa-moon'); // Store icon state
    }else{
      node1.setAttribute('rel', 'stylesheet');
      setTimeout(function(){
        node2.setAttribute('rel', 'stylesheet alternate');
      }, 10);
      sessionStorage.setItem('theme', 'light');
      sessionStorage.setItem('icon', 'fa-sun'); // Store icon state
    }
    var savedIcon = sessionStorage.getItem('icon'); 
    var icon = document.querySelector('.dark_mode_btn');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
    return false;
}
</script>
<style>
.dark_mode_btn_click{
  font-size: 30px; /* Adjust icon size */
  cursor: pointer; /* Makes it clickable */
  border-left: 2px solid #ccc; /*add a vertical line*/
}
</style>
```

#### 3.5 Highlighting Python Syntax 
The original theme has a poor syntax highlight scheme for Python language. I modify _sass/_syntax.scss for readable Python code trunks.
```html
.highlight {
  background-color: $code-background-color;
  .bp { color: $base06; } /* Name - Builtin - Pseudo */
  .c { color: $base00; font-style: italic; } /* Comment */
  .err { color: $base01; } /* Error */
  .k { font-weight: bold; } /* Keyword */
  .o { font-weight: bold; } /* Operator */
  .cm { color: $base0b; font-style: italic; } /* Comment - Multiline */
  .cp { color: $base0b; font-weight: bold; } /* Comment - Preprocessor */
  .c1 { color: $base0b; font-style: italic; } /* Comment - Single-line */
  .cs { color: $base06; font-weight: bold; font-style: italic; } /* Comment - Special */
  .gd { color: $base03; } /* Deleted */
  .gd .x { color: $base03; } /* Deleted - Special */
  .ge { font-style: italic; } /* Emphasis */
  .gr { color: $base01; } /* Generic - Error */
  .gh { color: $base06; } /* Generic - Heading */
  .gi { color: $base03;  } /* Inserted */
  .gi .x { color: $base03; } /* Inserted - Special */
  .go { color: $base06; } /* Generic - Output */
  .gp { color: $base07; } /* Generic - Prompt */
  .gs { font-weight: bold; } /* Generic - Strong */
  .gu { color: $base08; font-weight: bold; } /* Generic - Subheading */
  .gt { color: $base05;  } /* Generic - Traceback */
  .kc { font-weight: bold; } /* Keyword - Constant */
  .kd { font-weight: bold; } /* Keyword - Declaration */
  .kn { font-weight: bold; } /* Keyword - Namespace */
  .kp { font-weight: bold; } /* Keyword - Pseudo */
  .kr { font-weight: bold; } /* Keyword - Reserved */
  .kt { color: $base09; font-weight: bold; } /* Keyword - Type */
  .m { color: $base0a; } /* Literal - Number */
  .s { color: $base03; } /* All String */
  .n { color: $base0c; } /* Name */
  .na { color: $base0d; } /* Name - Attribute */
  .nb { color: $base0d; } /* Name - Builtin */
  .nc { color: $base09; font-weight: bold; } /* Name - Class */
  .nd { color: $base09; font-weight: bold; } /* Name - Class */
  .no { color: $base0d; } /* Name - Constant */
  .ni { color: $base08; } /* Name - Entity */
  .ne { color: $base05; font-weight: bold; } /* Name - Exception */
  .nf { color: $base0d; font-weight: bold; } /* Name - Function */
  .nn { color: $base07; } /* Name - Namespace */
  .nt { color: $base0d; } /* Name - Tag */
  .nv { color: $base0d; } /* Name - Variable */
  .ow { font-weight: bold; } /* Operator - Word */
  .w { color: $base06; } /* Text - Whitespace */
  .mf { color: $base0a; } /* Literal - Float */
  .mh { color: $base0a; } /* Literal - Hex */
  .mi { color: $base0a; } /* Literal - Integer */
  .mo { color: $base0a; } /* Literal - Octal */
  .vc { color: $base0d; } /* Name - Variable - Class */
  .vg { color: $base0d; } /* Name - Variable - Global */
  .vi { color: $base0d; } /* Name - Variable - Instance */
  .il { color: $base0a; } /* Literal - Number - Integer Long */
  .gc { color: $base06; } /* Generic - Command */
}
```

This trunk of code makes html/css not readable, but makes python code well-highlighted.
We can test it now:

```python
"""
a test code for python syntax highlight
"""
import torch

class model(nn.module):
  def _init(self):
    self. x = 'hello'

  def method_a(self,foo):
    print self.x + " "+ foo # comments
  if self.x == None:
    skip
  return 0.123456789

model.method_a(bool)
```
#### 3.6 Merging Main Pages 

The original template includes useful pages such as "yearly archive", "categories", and "tags". However, these pages take too much space in the headings/masthead. Here, I managed to merge them all into the title of a single page, showing it like below. 


![merge]({{ "/assets/images/merge.png" | relative_url }})

The idea is to define a modified templated html file called "archive-linked.html" and add buttons to the title of the pages (of course, it will ignore the title from .md file). I am not sure if it is the best practice but it works :v: The only problem for now is that the scale of display is not dynamically adjusted, so the tabs will stack on pages with a extremely narrow width. 

### 4. Concluding Remark 
This post will be updated if future changes of this website's feature are made.