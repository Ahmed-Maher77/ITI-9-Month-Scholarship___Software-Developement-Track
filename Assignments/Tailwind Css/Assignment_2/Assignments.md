# Assignment 2: Workcation Landing Page

## Overview
This assignment demonstrates a responsive landing page for "Workcation" - a service that helps users find work-friendly rentals in beautiful locations. Built with Tailwind CSS v4 using a more organized project structure with separate `src` and `dist` folders.

## Project Structure
```
Assignment_2/
└── solution/
    ├── index.html              # Main HTML file
    ├── package.json            # Project dependencies and scripts
    ├── package-lock.json       # Locked dependencies
    ├── .gitignore              # Git ignore file
    ├── src/
    │   └── input.css           # Tailwind CSS input file
    └── dist/
        └── output.css          # Compiled CSS output
```

## Features

### Hero Section
- **Responsive grid layout**: Uses `grid lg:grid-cols-2 2xl:grid-cols-5` for flexible layouts
- **Logo & branding**: SVG logo with "Workcation" text
- **Headline**: "You can work from anywhere. Take advantage of it." with responsive typography
- **Description**: Explains the service value proposition
- **CTA Button**: "Book your escape" with hover/active/focus states
- **Background image**: Full-width hero image on larger screens (`hidden lg:block`)

### Destinations Section
- **Section header**: "Popular destinations" with descriptive text
- **Responsive card grid**: `grid gap-6 md:grid-cols-2 xl:grid-cols-3`
- **6 Destination cards** featuring:
  - Toronto ($120/night, 76 properties)
  - Malibu ($215/night, 43 properties)
  - Chicago ($130/night, 115 properties)
  - Seattle ($135/night, 63 properties)
  - Colorado ($85/night, 47 properties)
  - Miami ($115/night, 86 properties)
- **Card layout**: Flex layout with image on left, content on right
- **Interactive links**: "Explore X properties" with hover transitions

## Tailwind CSS Classes Used

### Layout
- `grid`, `grid-cols-*`, `col-span-*`
- `flex`, `items-center`, `gap-*`
- `max-w-*`, `mx-auto`, `px-*`, `py-*`
- `relative`, `absolute`, `inset-0`

### Responsive Design
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- `hidden lg:block`, `lg:hidden`
- Responsive text sizing: `text-2xl sm:text-4xl lg:text-3xl xl:text-4xl`

### Styling
- Colors: `bg-gray-100`, `bg-gray-200`, `bg-white`, `bg-sky-500`, `text-gray-900`, `text-gray-600`, `text-sky-500`
- Typography: `font-bold`, `font-semibold`, `tracking-tight`, `uppercase`, `tracking-wider`
- Spacing: `mt-*`, `mb-*`, `px-*`, `py-*`, `gap-*`
- Borders: `rounded-lg`
- Shadows: `shadow-md`, `shadow-lg`
- Transitions: `transition`, `hover:`, `active:`, `focus:`

### Images
- `object-cover`, `object-center`
- `w-full`, `h-full`, `w-32`, `shrink-0`, `self-stretch`

## Build Commands

```bash
# Install dependencies
npm install

# Build CSS (with watch mode)
npm run build
```

**Script in package.json:**
```json
"build": "node ./node_modules/@tailwindcss/cli/dist/index.mjs -i ./src/input.css -o ./dist/output.css --watch"
```

## Key Differences from Assignment 1

| Aspect | Assignment 1 | Assignment 2 |
|--------|--------------|--------------|
| Input CSS | `./input.css` | `./src/input.css` |
| Output CSS | `./output.css` | `./dist/output.css` |
| HTML CSS Link | `./output.css` | `./dist/output.css` |
| Project Structure | Flat | Organized (src/dist) |
| Build Script | `build:css` | `build` |
| Git Ignore | No | Yes (`.gitignore`) |

## Dependencies
- `@tailwindcss/cli`: ^4.3.0
- `tailwindcss`: ^4.3.0

## Fonts
- **Inter** (Google Fonts): Weights 400, 500, 600, 700

## Images
All images sourced from Unsplash:
- Hero: `photo-1512314889357-e157c22f938d`
- Toronto: `photo-1507992781348-310259076fe0`
- Malibu: `photo-1507525428034-b723cf961d3e`
- Chicago: `photo-1494522855154-9297ac14b55f`
- Seattle: `photo-1502175353174-a7a70e73b362`
- Colorado: `photo-1464822759023-fed622ff2c3b`
- Miami: `photo-1514362545857-3bc16c4c7d1b`

## Key Learning Points
1. **Organized project structure** with `src/` and `dist/` separation
2. **Mobile-first responsive design** using Tailwind's breakpoint system
3. **CSS Grid** for complex layouts (`2xl:grid-cols-5`)
4. **Flexbox** for card alignments
5. **Component-like card patterns** with consistent styling
6. **Interactive states** (hover, focus, active) for better UX
7. **Tailwind CSS v4** with new `@import "tailwindcss"` syntax
8. **CLI-based build process** with watch mode for development
9. **Git ignore practices** for node_modules and build outputs
10. **Production-ready folder structure** for scalable projects