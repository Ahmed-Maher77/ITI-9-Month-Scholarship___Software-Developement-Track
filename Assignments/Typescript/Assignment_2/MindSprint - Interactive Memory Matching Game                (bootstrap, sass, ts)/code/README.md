# 🧠 MindSprint – Interactive Memory Matching Game

MindSprint is a browser-based memory matching game that challenges players to test their focus and recall under time pressure. It features a structured gameplay flow — from username entry and board preview to timed matching rounds — enhanced with real-time feedback, progress tracking, audio effects, and animated end-game results for an engaging and competitive user experience.

---

## 🌐 Live Preview

🔗 👀 Watch Live Demo: [ahmed-maher77.github.io/MindSprint___Interactive-Memory-Matching-Game](https://ahmed-maher77.github.io/MindSprint___Interactive-Memory-Matching-Game/)

---

## 🎥 Demo & Explanation Videos

🎬 Watch on LinkedIn:  []()

---

## 🗂️ Project Structure

```text
MindSprint/
│
├── ts/                   # TypeScript source code
│   ├── game/             # Core game logic (Game, GameStatus)
│   ├── interfaces/       # TypeScript interfaces (contracts)
│   ├── models/           # Data models (Board, Card)
│   ├── services/         # AudioManager, Timer
│   ├── ui/               # UI rendering and DOM manipulation
│   ├── utils/            # Helper utilities
│   └── main.ts           # Application entry point
│
├── js/                   # Compiled JavaScript output
├── styles/               # SCSS and compiled CSS
├── packages/             # Third-party libraries (Bootstrap, Font Awesome)
├── files/                # Additional assets and files
├── images/               # Image assets used by the game
├── index.html            # Main HTML file
├── 404.html              # Custom not-found page
├── robots.txt            # Crawl instructions for search engines
├── sitemap.xml           # Sitemap for search engines
├── LICENSE               # Project license
└── README.md             # Project documentation
```

---

## 💻 Used Technologies

- **TypeScript (Strict Mode):** Ensures type safety, scalability, and maintainable game logic architecture.
- **JavaScript (ES Modules):** Compiled output for modern browser compatibility and modular execution.
- **HTML5:** Provides semantic structure and accessibility-friendly markup.
- **SCSS / Sass:** Enables modular, reusable, and maintainable styling with advanced features.
- **Bootstrap 5.3:** Handles responsive layout, utilities, and modal components efficiently.
- **Font Awesome:** Supplies scalable icons for UI feedback and controls.
- **Native DOM APIs:** Powers efficient UI updates and interaction handling.
- **HTMLAudioElement:** Manages layered sound effects and background audio system.
- **Git & GitHub:** Supports version control and iterative feature development workflow.
- **GitHub Pages:** Hosts the frontend application for public access.

---

## ✨ Key Features

- **Username Validation:** Enforces valid player input before gameplay begins.
- **Countdown Start Overlay:** Engaging 3-2-1-GO transition into gameplay.
- **Card Preview Phase:** Allows players to memorize card positions before the round starts.
- **Flip & Match Mechanics:** Smooth and responsive card interaction system.
- **Real-Time Feedback:** Instant updates for matches, mismatches, and progress.
- **Progress Tracking:** Visual progress bar showing completion percentage.
- **Wrong Attempts Counter:** Tracks incorrect tries to enhance challenge.
- **5-Minute Timer:** Adds time pressure with automatic timeout handling.
- **Pause/Resume System:** Safely pauses gameplay, timer, and audio state.
- **Audio Control:** Global mute/unmute toggle with layered sound effects.
- **End-Game Results:** Animated win/lose screens with performance summary.
- **Custom 404 Page:** Handles invalid routes with user-friendly redirection.
- **Responsive UI:** Optimized for different screen sizes and devices.

---

## 🔄 Program Flow

1. Page load initializes the game state and renders the board.
2. The player starts a new session and enters a valid username.
3. A countdown sequence (3-2-1-GO) begins, followed by a short card preview.
4. The gameplay loop starts and card interactions are enabled.
5. Each card selection triggers match validation.
6. A successful match updates progress and advances the round.
7. A mismatch increments wrong tries and flips the cards back after a short delay.
8. The player can pause and resume the round at any time.
9. The countdown timer runs continuously until the round ends.
10. The session ends when all pairs are matched or the time expires.
11. A result screen is displayed with statistics and animated feedback.

---

## 🧱 OOP Standards

- **Encapsulation:** Game logic and state are isolated within classes such as `Game`, `Board`, `Timer`, `AudioManager`, and `UIManager`, with controlled access through private fields and methods.
- **Abstraction:** Interfaces such as `IGame`, `IBoard`, `ICard`, `ITimer`, `IAudioManager`, and `IUIManager` define clear contracts and separate implementation details from usage.
- **Polymorphism:** Interface-based polymorphism allows interchangeable implementations without breaking expected behavior.
- **Composition over Inheritance:** The `Game` class composes multiple modules (`Board`, `Timer`, `UI`, and `Audio`) to build flexible and scalable behavior.

---

## 🧩 SOLID Principles

- **S - Single Responsibility:** Each class has a focused role; for example, `Timer` handles time tracking while `Board` manages card generation and shuffling.
- **O - Open/Closed:** The architecture is extendable with new cards, sounds, and UI behavior, although a few hardcoded values can still be externalized.
- **L - Liskov Substitution:** Implementations respect their interface contracts and can be used without unexpected behavior.
- **I - Interface Segregation:** Interfaces are domain-specific; larger contracts like `UIManager` can be split further if the app grows.
- **D - Dependency Inversion:** The code already relies on abstractions in type definitions, and constructor-based dependency injection would improve flexibility further.

---

## 🌍 Best Practices & Standards

### 🔍 SEO

- Descriptive page titles and meta descriptions
- Canonical URLs to avoid duplicate content
- Structured data for better search engine understanding
- Sitemap and robots.txt for crawl optimization

### ♿ Accessibility

- Semantic HTML structure
- ARIA roles for assistive technologies
- Accessible UI controls such as audio toggle, modals, and overlays
- Clear navigation and readable content

### ⚡ Performance

- Optimized asset loading and a lightweight static structure
- Reduced DOM thrashing by building card markup with `DocumentFragment` before a single append
- Used event delegation for board interactions instead of attaching listeners to every card
- Cached frequently used DOM references to avoid repeated queries
- Updated only the necessary text, class, and style values to avoid full UI re-renders.
- Avoided unnecessary blocking scripts and kept execution modular
- Used native DOM APIs for efficient, minimal updates
- Preconnected to external resources where appropriate to reduce connection overhead

### 🔐 Security

- Safe external linking with `rel="noopener noreferrer"`
- No unsafe user input injection
- Controlled DOM manipulation
- No exposure of sensitive data

### 🛠️ Maintainability

- Modular architecture across core logic, UI, services, and models
- Clear separation of concerns
- Centralized metadata and configuration
- Scalable folder structure

### 🌐 Cross-Compatibility

- TypeScript is used as the JavaScript preprocessor to produce browser-ready ES module output.
- Sass is used as the CSS preprocessor to keep styles modular and consistent across browsers.
- The app relies on standard HTML, CSS, and native DOM APIs to remain compatible with modern browsers.
- Static assets and compiled output are separated from source files to simplify deployment across environments.
- A lightweight structure helps the app run reliably on GitHub Pages, local static servers, and other hosting platforms.

### 🌐 Web Quality / Discoverability

- Custom 404 page with `noindex` to avoid low-value indexing
- Sitemap for clear URL structure
- Robots.txt to control crawler behavior
- Social metadata for better sharing previews

---

## 📸 Website Preview (UI Mockup)

<a href="https://ahmed-maher77.github.io/MindSprint___Interactive-Memory-Matching-Game/" title="demo">
  <img src="https://github.com/user-attachments/assets/66dc3ff8-3e93-4bf8-ae80-21d7e3bdc57f" alt="website preview - Demo - UI Mockup" width="400">
</a>


---

## 📥 Installation Instructions (Local Setup)

### Requirements

- Node.js and npm
- TypeScript compiler
- Sass compiler
- A local static server such as VS Code Live Server

### Local Setup

```bash
# Clone the repository
git clone https://github.com/ahmed-maher77/MindSprint___Interactive-Memory-Matching-Game.git

# Navigate into the project folder
cd MindSprint___Interactive-Memory-Matching-Game

# Open index.html directly in the browser
# or launch it with a local static server
```

### If You Change the Source Files

```bash
# Install TypeScript globally if needed
npm install -g typescript

# Rebuild the TypeScript output
tsc -w

# Install Sass globally if needed
npm install -g sass

# Rebuild the CSS output
sass --watch styles/sass:styles/css
```

### Notes

- This project is already shipped with compiled JavaScript in the `js/` folder, so no npm install step is required for basic usage.
- For the smoothest local preview, use VS Code Live Server or any simple static file server.

---

## 📬 Contact


- 🔗 **LinkedIn:** <a href="https://www.linkedin.com/in/ahmed-maher-algohary" title="Contact via LinkedIn">https://www.linkedin.com/in/ahmed-maher-algohary</a>
- 📧 **Email:** <a href="mailto:ahmedmaher.dev1@gmail.com" title="Contact via Email">ahmedmaher.dev1@gmail.com</a>
 
---

## ⭐ Support

If you found this project helpful or inspiring, please consider giving it a ⭐. Your support helps me grow and share more open-source projects like this!
