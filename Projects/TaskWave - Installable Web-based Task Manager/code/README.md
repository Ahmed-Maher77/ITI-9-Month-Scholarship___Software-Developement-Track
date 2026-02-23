## TaskWave – Installable Task Management Web-App

TaskWave is a modern, installable task management web app that helps users stay organized and productive — even offline.

Users can create and schedule tasks, assign priority levels (Low / Medium / High), add tags, and reorder tasks via drag-and-drop with persistent storage in IndexedDB. Advanced filtering and sorting by status, priority, and tag ensure efficient task management.

Built as a Progressive Web App (PWA), TaskWave delivers a fast, responsive, app-like experience with real-time updates, overdue reminders, weekly progress tracking, optional notifications, and customizable dark/light themes.

---

## 🌐 Live Preview

👀 **Watch Live Demo**: [https://ahmed-maher77.github.io/TaskWave-Installable-Web-based-Task-Manager/](https://ahmed-maher77.github.io/TaskWave-Installable-Web-based-Task-Manager/)
<!-- - 🎥 **Demo Video**: [Watch the Demo on LinkedIn]() -->

---

## 💻 Used Technologies

### UI & Layout
- **HTML5**: Provides semantic structure for forms, task lists, and content sections, ensuring accessibility and SEO-friendly markup.  
- **CSS3 / Custom Styles**: Implements responsive layouts, theming, and smooth animations using modern CSS features.  
- **Bootstrap 5.3**: Accelerates UI development with a responsive grid, utility classes, and pre-styled components.  
- **Font Awesome**: Delivers scalable icons for actions like add, complete, delete, toggle, and install, enhancing visual clarity.  

### Logic & State Management
- **JavaScript (ES Modules)**: Handles all client-side logic including task CRUD operations, priority/tags, filtering and sorting (by status, priority, tag), drag-and-drop reordering, timers, theming, notifications, and animations in a modular structure (`app.js`, `filters.js`, `animations.js`, `pushNotificationsHandler.js`, `databaseManager.js`).  
- **IndexedDB (`idb` wrapper)**: Stores tasks locally in a persistent object store, enabling offline functionality and data retention across sessions.  
- **localStorage**: Saves user preferences such as theme (dark/light) and notification settings.  

### PWA & Browser APIs
- **Service Worker (PWA)**: Caches assets, serves offline and 404 pages, and implements a network-first with cache-fallback strategy for robust performance.  
- **Notifications API**: Sends optional browser notifications for overdue tasks, respecting user permissions.  
- **HTML5 Drag and Drop API**: Powers manual task reordering via a grip handle; drag events and `DataTransfer` persist the new order to IndexedDB.  
- **IntersectionObserver API**: Enables smooth scroll-reveal animations when elements enter the viewport.  

### Hosting
> **Frontend Hosting**: GitHub Pages (static hosting for the PWA).


---

## ✨ Key Features

- **Task Creation & Scheduling**: Quickly add tasks with optional descriptions and flexible scheduling options.  
- **Priority & Tags**: Set task **priority** (Low / Medium / High) and optional **tags** (e.g. Work, Personal) via an expandable “additional options” section; tasks display priority and tag badges in the list.  
- **Filter & Sort by Priority / Tag**: Use advanced filters (toggle below the status pills) to filter by priority or by tag (text match), and sort by **Priority (High → Low)** or default order.  
- **Drag-and-Drop Reordering**: Reorder tasks manually by dragging the **grip handle** on the left of each task; order is persisted in IndexedDB and respected when loading and filtering.  
- **Status Management**: Automatically track tasks as **pending**, **completed**, or **overdue**, with clear visual indicators.  
- **Smart Filters**: Instantly sort tasks by **All**, **Pending**, **Completed**, or **Overdue** to focus on what matters most.  
- **Live Counters & Weekly Insights**: Real-time badges display total, pending, completed, and overdue tasks, alongside a “tasks completed this week” metric.  
- **Overdue Detection & Timers**: Tasks are automatically marked as overdue when deadlines pass, even while the app is open.  
- **Optional Notifications**: Enable native browser notifications for overdue tasks, respecting user preferences.  
- **Light & Dark Themes**: Seamlessly switch between light and dark modes, with preferences saved for future sessions.  
- **Responsive & Mobile-Friendly UI**: Optimized layouts for desktop and mobile devices, including scrollable filters on smaller screens.  
- **Installable PWA**: Native-like experience with a custom “Install” button and `beforeinstallprompt` support.  
- **Offline & 404 Support**: Custom offline and error pages served when the network is unavailable or routes are invalid.  
- **Scroll-Reveal Animations**: Smooth animations reveal content and tasks as users scroll, enhancing engagement.  
- **Accessibility Enhancements**: Fully keyboard-navigable controls with proper ARIA labels and states for an inclusive experience.

---

## 📸 Website Preview

<a href="https://ahmed-maher77.github.io/TaskWave-Installable-Web-based-Task-Manager/" title="demo">
  <img src="https://github.com/user-attachments/assets/fdfc3382-5eb7-4cec-a951-8310ed1f63b3" alt="website preview - Demo - UI Mockup" width="400">
</a>

---

## 📁 Project Structure

```text
├─ index.html            # Main entry: form, task list, install/theme controls
├─ style.css             # Global styles, theming, responsive layout, animations
├─ manifest.json         # PWA manifest: name, icons, display mode, colors
├─ service-worker.js     # Caching, offline/404 support, notification handling
├─ js/
│  ├─ app.js             # Core logic: UI interactions, timers, status updates
│  ├─ databaseManager.js # IndexedDB CRUD operations via idb
│  ├─ filters.js         # Task filtering and counters
│  ├─ animations.js      # Scroll-reveal animations
│  ├─ pushNotificationsHandler.js # Notification permissions and triggers
│  └─ packages/          # Local third-party libraries (e.g., idb)
├─ pages/
│  ├─ offline.html       # Custom offline page
│  └─ 404.html           # Custom 404 page
└─ images/               # Logos, icons, screenshots, and mockups
```

---

## 🗄 Database Structure

- **Storage**: IndexedDB (`todoListDB_iti`, version `2`)
  - Store: `tasks` (keyPath: `id`)
  - Main fields: `id`, `title`, `description?`, `endTime?`, `status` (`pending | completed | overdue`), `completedAt?`, `priority?` (Low | Medium | High), `tags?` (array of strings), `order?` (number, for drag-and-drop ordering).
- **Preferences**: `localStorage` (`theme`, `notificationsEnabled`)
- **Backend**: None required – all data stays in the browser.


---

## 📬 Contact & Contribution
- 🧑‍💻 **Portfolio:** <a href="https://ahmedmaher-portfolio.vercel.app/" title="See My Portfolio">https://ahmedmaher-portfolio.vercel.app/</a>
- 🔗 **LinkedIn:** <a href="https://www.linkedin.com/in/ahmed-maher-algohary" title="Contact via LinkedIn">https://www.linkedin.com/in/ahmed-maher-algohary</a>
- 📧 **Email:** <a href="mailto:ahmedmaher.dev1@gmail.com" title="Contact via Email">ahmedmaher.dev1@gmail.com</a>

> Contributions, suggestions, and bug reports are welcome. Feel free to open issues or pull requests.

---

## ⭐ Support

If you found this project helpful or inspiring, please consider giving it a ⭐. Your support helps me grow and share more open-source projects like this!
