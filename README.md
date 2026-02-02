
# 🚀 PokéDex Challenge

## 👾 Online DEMO

https://pokedex-psi-olive.vercel.app/

Have fun!

A modern, responsive, and fully accessible PokéDex built with **Next.js 15**, **TypeScript**, and **Styled Components**. This project focuses on high-quality UI/UX, multi-language support, and strict accessibility standards.

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Styled Components (with Theme support)
* **State Management:** React Context API (for Localization)
* **Accessibility Testing:** axe DevTools & axe Accessibility Linter

---

## ✨ Key Features & Technical Solutions

### 1. Advanced Data Fetching (The "PokeAPI Trap")

One of the main challenges of the PokeAPI is that Pokémon data is split between two different endpoints (`/pokemon` and `/pokemon-species`).
I implemented a server-side data merging strategy to ensure that physical attributes (stats, types) and localized metadata (descriptions, genera, names) are fetched in parallel and unified before reaching the client.

### 2. Multi-Language Support (i18n)

The app features a custom-built localization system using React Context.

* **Dynamic Content:** Not only the UI strings but also the Pokémon descriptions, types, and "genus" (e.g., "Seed Pokémon") change instantly when switching between **English** and **Italian**.
* **Data Sanitization:** I implemented a regex-based cleaning utility to handle the legacy formatting characters (`\f`, `\n`, `\r`) present in PokeAPI's flavor text entries, ensuring a clean reading experience.

### 3. Accessibility (A11y) first

Following the WCAG guidelines, the project achieves a high accessibility score:

* **Semantic HTML:** Proper use of Landmarks (`<header>`, `<main>`, `<footer>`).
* **Color Contrast:** A custom utility (`getContrastColor`) dynamically calculates whether to show white or black text on Pokémon type badges based on their background color.
* **Screen Reader Optimization:** Images include localized descriptive `alt` tags (e.g., "Pikachu in an attack pose").
* **Keyboard Navigation:** All interactive elements have visible focus states.

### 4. Performance & UX

* **Server Components:** Data fetching is handled on the server to reduce client-side JavaScript.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
* **Search & Filters:** Real-time filtering by name or ID.

---

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install

```

Then, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

* `/src/app`: Next.js App Router (Server Components & Metadata)
* `/src/components`: UI Components (Client Components for interactivity)
* `/src/context`: Language Context for global i18n state
* `/src/lib`: API utilities, types, and theme configuration

---

### Final Notes

This project was developed with a focus on **clean code** and **maintainability**. Every decision, from the folder structure to the choice of Styled Components, was made to ensure the application is scalable and developer-friendly.
