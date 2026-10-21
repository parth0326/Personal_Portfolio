# Parth Patel — Personal Portfolio

Live site: [parthpatelportfolio.org](https://parthpatelportfolio.org)

Personal portfolio website for Parth Patel, Cybersecurity major with a Deep Learning / AI minor at Miami University, Class of 2027. It covers my experience, skills, and the security labs, case studies, and AI projects I've worked on.

---

## Tech Stack

Built from scratch — no frameworks, no libraries.

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, animations
- **JavaScript** — vanilla ES6+
- **SVG** — project breakdown circle, drawn by hand in JS
- **Netlify Functions** — backend for the chat assistant (Claude API)
- **Fonts** — JetBrains Mono, Inter (Google Fonts)
- **Hosting** — Netlify
- **Domain** — Netlify DNS

---

## Features

- Dark / Light mode toggle with `localStorage` persistence
- Typed text animation cycling through role descriptions
- Experience section with my internship at Kahua
- Projects section built from a single data file (`js/projects-data.js`)
- **Project breakdown circle** — three rings showing project type, security category, and language. It grows as more projects get added, and clicking a slice filters the cards
- Filter buttons and keyword search that work together with the circle
- AI chat assistant that answers questions about my background and projects
- "Currently" section showing active focus areas
- One-click email copy with confirmation flash
- Mobile-responsive with bottom navigation bar
- Respects reduced motion settings

---

## Adding a Project

Everything in the projects section comes from `js/projects-data.js`. To add one, add an object to the list:

```js
{
  title: "Project name",
  when: "Jan – Mar 2027",            // optional
  summary: "One or two sentences on what I did.",
  type: "Personal project",          // Team project, Lab, Case study, Course project...
  category: "Network Security",      // security category, or null
  languages: ["Python"],             // [] if no code
  tools: ["Wireshark", "Zeek"],
  area: ["security"],                // filter buttons: security, ai, other
  link: "https://github.com/...",    // optional
  featured: false                    // optional, full-width card
}
```

The cards, filters, circle, and chat assistant all pick it up automatically. New categories and languages get their own slice and color.

---

## Security

Since this is a cybersecurity portfolio, I tried to practice what I'm studying:

- The Anthropic API key lives in a Netlify environment variable and is only used server-side in the function, never in the browser
- The chat function validates input, caps message length and history, and rate limits requests per IP
- The system prompt tells the assistant to ignore attempts to override its instructions
- `netlify.toml` sets a Content Security Policy (no inline scripts), plus `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers
- Project data is HTML-escaped before it gets rendered

---

## Project Structure

```
Personal_Portfolio/
├── index.html                 # Main page
├── favicon.svg
├── netlify.toml               # Functions config + security headers
├── css/
│   └── style.css              # All styles and theme variables
├── js/
│   ├── projects-data.js       # Project list (edit this to add projects)
│   ├── projects.js            # Builds project cards, filters, search
│   ├── project-orb.js         # Project breakdown circle
│   └── main.js                # Theme, nav, animations, chat widget
├── netlify/
│   └── functions/
│       └── chat.js            # Chat assistant backend
└── assets/
    ├── profile.jpg            # Profile photo
    └── resume.pdf             # Resume
```

If `profile.jpg` is missing the hero shows my initials, and if `resume.pdf` is missing the resume buttons hide themselves.

---

## Local Development

No build step required. Serve the folder with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve .
```

The chat assistant needs the Netlify function, so run it with the Netlify CLI if you want to test that part:

```bash
npx netlify dev
```

and set `ANTHROPIC_API_KEY` in a local `.env` file (not committed).

---

## Deployment

Deployed via [Netlify](https://netlify.com) with continuous deployment from this repository. Every push to `main` automatically redeploys the live site. `ANTHROPIC_API_KEY` is set under Site configuration → Environment variables.

---

## Contact

- Email: [ppatel2005263@gmail.com](mailto:ppatel2005263@gmail.com)
- GitHub: [github.com/parth0326](https://github.com/parth0326)
- LinkedIn: [linkedin.com/in/parth-patel-0656822b4](https://www.linkedin.com/in/parth-patel-0656822b4/)
