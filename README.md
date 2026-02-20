# GetDevWorks — Company Page

> End-to-end software development, from architecture to deployment, powered by AI.

**Live Site →** [https://marcobaturan.github.io/GetDevWorks/](https://marcobaturan.github.io/GetDevWorks/)

---

## About

Single-page company website for **GetDevWorks**, a solo software consultancy specialising in fullstack development, software architecture, and AI integration.

## Features

- Dark glassmorphism design (backdrop-filter blur, cyan/blue glow palette)
- Bidirectional scroll fade — elements fade in scrolling down *and* fade out in reverse when scrolling up
- Sticky frosted-glass navigation with mobile hamburger menu
- Three-column services grid
- Numbered value propositions section
- Contact CTA card with glow effect
- Fully responsive: mobile (≤480 px), tablet (481–768 px), desktop (≥769 px)
- Zero external JS dependencies · semantic HTML5 + ARIA attributes

## Project Structure

```
getdevworks/
├── index.html   # Page structure and content
├── style.css    # All styles, design tokens, fade animations, breakpoints
├── script.js    # Bidirectional IntersectionObserver, nav, hamburger, smooth scroll
└── README.md    # This file
```

## Local Development

```bash
# Python 3 — no install required
cd /path/to/getdevworks
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

## Deployment (GitHub Pages)

This project uses a **GitHub Actions workflow** (`.github/workflows/static.yml`) to automatically deploy the `main` branch to GitHub Pages.

To deploy changes, simply commit and push to the `main` branch:

```bash
git add .
git commit -m "feat: your changes"
git push
```

## License

© 2026 GetDevWorks — Marco Baturan. All rights reserved.
