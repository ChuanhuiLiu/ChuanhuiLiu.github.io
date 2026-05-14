# Chuanhui Liu's Personal Website

## Introduction

This is the personal website of Chuanhui Liu. The site serves as a blog and portfolio, featuring posts on various topics including statistics, machine learning, and personal projects. It is built using Jekyll, a static site generator, and the Minimal Mistakes theme for a clean, responsive design. The website includes navigation, author profiles, search functionality, and archive pages for easy browsing.

Note that all the official documentation of the Minimal Mistakes framework can be found at https://mmistakes.github.io/minimal-mistakes/docs/.

## File Structure

- `_config.yml`: Contains the setup and configuration for the website, including site title, description, plugins, and theme settings. **Note:** Changes to this file require restarting the Jekyll server.
- `_posts/`: Directory containing blog posts in Markdown format, organized by date.
- `_pages/`: Static pages such as About, Portfolio, and custom pages.
- `_layouts/`: HTML templates for different page types (e.g., single posts, archives).
- `_includes/`: Reusable HTML components like headers, footers, and sidebars.
- `_sass/`: SCSS files for customizing the theme's styles.
- `_data/`: Data files, such as navigation configuration.
- `assets/`: Static assets including images, CSS, and JavaScript files.
- `Gemfile`: Ruby dependencies and plugins for Jekyll.
- `_site/`: Generated site files (not to be edited directly).

## Usage

### Prerequisites

- Ruby (version 2.5 or higher). Download and install from [rubyinstaller.org](https://rubyinstaller.org/) for Windows, or use your system's package manager (e.g., `apt` on Ubuntu, `brew` on macOS).
- Jekyll and Bundler: After installing Ruby, open a terminal and run `gem install jekyll bundler` to install Jekyll and Bundler. This command installs the necessary tools for building and managing Jekyll sites. You can verify the installation by running `jekyll -v` and `bundle -v` to check their versions.

### Installation

1. Clone this repository.
2. Run `bundle install` to install the required gems and dependencies.

**ProTip:** Be sure to remove `/docs` and `/test` if you forked Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't want them littering up your repo.

**Note:** The theme uses the `jekyll-include-cache` plugin which will need to be installed in your `Gemfile` and added to the `plugins` array of `_config.yml`. Otherwise you'll throw `Unknown tag 'include_cached'` errors at build.

### Local Development

- To serve the site locally, run `bundle exec jekyll serve`.
- Open your browser and navigate to `http://localhost:4000` to view the website.
- For content management, access the admin interface at `http://localhost:4000/admin` (requires the jekyll-admin plugin).

### Building the Site

- To build the site for production, run `bundle exec jekyll build`.
- The generated files will be in the `_site/` directory.

### Deployment

- This site is set up for GitHub Pages. Push changes to the `master` branch to automatically deploy updates.

---

## Troubleshooting

If you have a question about using Jekyll, start a discussion on the [Jekyll Forum](https://talk.jekyllrb.com/) or [StackOverflow](https://stackoverflow.com/questions/tagged/jekyll). Other resources:

- [Ruby 101](https://jekyllrb.com/docs/ruby-101/)
- [Setting up a Jekyll site with GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- [Configuring GitHub Metadata](https://github.com/jekyll/github-metadata/blob/master/docs/configuration.md#configuration) to work properly when developing locally and avoid `No GitHub API authentication could be found. Some fields may be missing or have incorrect data.` warnings.
