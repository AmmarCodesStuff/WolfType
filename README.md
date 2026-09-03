<div align="center">

<img src="favicon.svg" width="88" height="88" alt="WolfType logo" />

# WolfType

### Master Your Keyboard. One Key at a Time. 🐺⌨️

<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-3D8BFF.svg?style=for-the-badge&labelColor=0d121c" alt="MIT License"></a>
<img src="https://img.shields.io/badge/build-static%20%2F%20no%20dependencies-3D8BFF.svg?style=for-the-badge&labelColor=0d121c" alt="No dependencies">
<img src="https://img.shields.io/badge/stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-3D8BFF.svg?style=for-the-badge&labelColor=0d121c" alt="Stack">
<img src="https://img.shields.io/badge/hosting-GitHub%20Pages-3D8BFF.svg?style=for-the-badge&labelColor=0d121c" alt="GitHub Pages ready">

[Getting Started](#-getting-started) · [Features](#-features) · [Deployment](#-deploying-to-github-pages) · [Structure](#-project-structure) · [Roadmap](#-roadmap)

</div>

<br/>

> 🎯 WolfType is a premium, keyboard-first typing platform built on one idea: practice time shouldn't be wasted on meaningless text.
> 📜 Every long-form passage is drawn from real history — Ancient Mesopotamia, the Roman Republic, the Islamic Golden Age, the Ottoman conquest of Constantinople, the Renaissance, the Space Race — so every minute spent building speed also builds knowledge.
> ⌨️ It ships as a fully static site with zero build pipeline, zero backend, and zero external services required to run.
> 📊 Every number on screen — WPM, raw WPM, accuracy, consistency — is computed directly from real keystroke timing. Nothing is simulated or hardcoded.
> 🔒 All progress, stats, and settings persist locally in the browser, so it works fully offline once loaded.

<br/>

<div align="center">
  <img src="https://media.giphy.com/media/L1R1tvL9OqE9y/giphy.gif" width="65%" alt="typing on keyboard demo" />
  <p><sub>Focus on the words, not the interface.</sub></p>
</div>

---

## 📖 Overview

WolfType combines a precision typing engine with historically grounded reading material. Instead of random word soup, learners progress through a structured academy, adaptive weak-key drills, and a full library of original historical passages — while the platform tracks genuine speed, accuracy, and consistency metrics behind the scenes.

## ✨ Features

| | |
|---|---|
| ⌨️ **Precision Typing Engine** | Real keystroke-level WPM, raw WPM, accuracy, consistency, and error tracking |
| 📜 **History Library** | Original passages spanning Ancient Rome, the Islamic Golden Age, and the Ottoman Empire through to the Space Race, organized by era, category, and difficulty |
| 🕌 **Islamic World Content** | Dedicated passages on the Islamic Golden Age's House of Wisdom, the Ottoman conquest of Constantinople under Mehmed II, and Mansa Musa's legendary pilgrimage to Mecca |
| 🕰️ **Interactive Timeline** | Jump into any historical period and start typing that passage instantly |
| 🎓 **Structured Academy** | 15 progressive lessons — home row basics to expert-level historical writing |
| 🎯 **Adaptive Practice** | Automatic weak-key detection with generated drills, plus finger training on a virtual keyboard |
| 📊 **Deep Analytics** | WPM/accuracy trends, keyboard heatmap, and full test history |
| 🐺 **Progression System** | XP, levels (Beginner → Alpha), achievements, and daily streaks |
| 🏆 **Leaderboards** | Global, weekly, daily, and category-based rankings |
| 🎨 **Themes** | Seven black + electric-blue theme variants |
| ⌨️ **Command Palette** | Full keyboard-first navigation via `Ctrl/Cmd + K` |
| 💾 **Local Persistence** | All progress, stats, and settings saved via `localStorage` — no account required |
| 🌐 **Live Internet Text** | Time and zen mode tests stream real, ever-changing prose from Wikipedia's public API once the local buffer runs low, so long sessions never repeat the same words — with an instant, silent fallback to local generation if offline |

<br/>

<div align="center">
  <img src="https://media.giphy.com/media/xUOxf48TZKMwmB2eoI/giphy.gif" width="55%" alt="dashboard analytics demo" />
  <p><sub>Every metric is real — nothing on the dashboard is hardcoded.</sub></p>
</div>

## 🕌 Historical Content Spotlight

WolfType's Islamic and Ottoman history coverage includes:

- 🏛️ **The Islamic Golden Age** — the House of Wisdom in Baghdad, Al-Khwarizmi's algebra, and Ibn Sina's medical encyclopedias
- 🏰 **The Ottoman Conquest of Constantinople (1453)** — Sultan Mehmed II's siege and the founding of Ottoman Istanbul
- 🐫 **Mansa Musa's Pilgrimage (1324)** — the Mali Empire's wealth and its journey to Mecca
- 📚 Additional passages covering the Mongol Empire's Pax Mongolica, Byzantine Constantinople, and Song Dynasty China

More historical eras and categories are easy to add — see [`data-passages.js`](data-passages.js).

## 🧰 Tech Stack

WolfType intentionally avoids a build step or framework overhead:

- 🧱 **HTML5 / CSS3** — hand-built design system, no UI framework
- ⚙️ **Vanilla JavaScript (ES6+)** — hash-based router, event delegation, no bundler required
- 📈 **Canvas API** — all charts drawn natively, zero charting library
- 🔤 **Google Fonts** — Fraunces (display), Sora (UI), JetBrains Mono (typing/stats)
- 💽 **`localStorage`** — client-side persistence layer for stats, settings, and progress

No `npm install`, no compilation, no dependencies to audit. Clone it and it runs.

## 🚀 Getting Started

```bash
git clone https://github.com/<your-username>/WolfType.git
cd WolfType
python3 -m http.server 8080
```

Then open `http://localhost:8080` in any modern browser. Alternatively, just double-click `index.html` — everything runs locally with no server requirement, since there's nothing to compile.

> ⚠️ **If you see an unstyled page with plain blue links and no layout:** you're most likely viewing the file through a restricted preview (common in mobile file-manager "quick look" panes, or in-app browsers like Telegram/WhatsApp's document viewer), which blocks external CSS and JavaScript for security and only renders raw HTML. This is not a bug in the site — open the extracted folder in a full browser tab instead (or better, just deploy it to GitHub Pages or Vercel below, where this can't happen at all).

## 🌐 Deploying to GitHub Pages

**Option A — Branch deployment (fastest)**

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select the `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a couple of minutes.

**Option B — GitHub Actions**

A ready-made workflow is included at [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Just set **Settings → Pages → Source** to `GitHub Actions`, and every push to `main` deploys automatically.

## ▲ Deploying to Vercel

WolfType needs zero configuration on Vercel — it's a static site with no build step:

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework Preset: leave as **Other** (auto-detected).
3. Build Command / Output Directory: leave blank — there's nothing to build.
4. Deploy. A minimal [`vercel.json`](vercel.json) is included to keep URLs clean.

## 🗂 Project Structure

```
WolfType/
├── index.html          # App shell and view containers
├── manifest.json       # PWA manifest
├── vercel.json         # Zero-config Vercel static deployment
├── favicon.svg         # Custom vector wolf mark
├── styles.css          # Design system — black + electric-blue theme
├── data-passages.js    # Historical passage & timeline content
├── data-lessons.js     # Academy lessons, achievements, finger map
├── storage.js          # localStorage persistence layer
├── typing-engine.js    # Keystroke-driven WPM/accuracy/consistency engine
├── views.js             # HTML view templates for every page
├── app.js               # Router, event wiring, charts, command palette, live-text streaming
└── .github/workflows/pages.yml   # Optional CI/CD deploy workflow
```

All files sit in a single flat folder on purpose — no nested subfolders — so the site survives being unzipped by any tool (including mobile file managers that sometimes flatten or mishandle nested directories) without broken links.

## 🎯 Design Philosophy

- ✒️ **Minimal, not empty.** Every element earns its place; nothing is decorative filler.
- ⌨️ **Typing is the priority.** The interface recedes the moment you start a test — passage, caret, WPM, accuracy, timer, nothing else.
- 🧮 **No fabricated numbers.** WPM, accuracy, and consistency are computed from actual keystroke events every time, not approximated or hardcoded.
- 🌌 **Black + electric blue.** A deliberate departure from the yellow/black typing-test convention — premium, technical, and calm.

## 🗺 Roadmap

- [ ] Optional backend sync (accounts, cross-device progress)
- [ ] Expanded passage library (target: 500+ passages, including deeper Ottoman and Islamic history coverage)
- [ ] Friend system and head-to-head challenges
- [ ] Admin panel for content management
- [ ] Offline-first PWA caching

## 🤝 Contributing

Issues and pull requests are welcome. If you're adding historical content, please keep passages factually grounded and cite context where relevant — historical accuracy is core to what WolfType is for.

```bash
git checkout -b feature/your-feature
git commit -m "Add: your feature"
git push origin feature/your-feature
```

Then open a pull request.

## 📄 License

Released under the [MIT License](LICENSE) — free to use, modify, and distribute.

---

<div align="center">

### Type Faster. Type Smarter. Learn History. 🐺

Developed by **Ammar** — [linktr.ee/ammarbinyasir_1](https://linktr.ee/ammarbinyasir_1)

⭐ Star this repo if WolfType helped you type faster.

</div>
