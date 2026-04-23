# 🧠 BLUE BRAIN — Creative Solutions Agency

> Your strategic partner for brand identity, digital marketing, web & app development, and creative excellence across Egypt and Saudi Arabia.

---

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Pages](#pages)
- [Internationalization](#internationalization)
- [Environment](#environment)

---

## 🏢 About

**Blue Brain** is a full-featured agency website built with React. It supports bilingual content (Arabic / English) with full RTL/LTR switching, dynamic data fetched from a REST API, and a clean modern UI.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Icons | React Icons + FontAwesome |
| Language | JavaScript (JSX) |
| Build Tool | Vite |
| API | Custom REST API (`createApi`) |

---

## 📁 Project Structure

```
src/
├── Assets/                  # Images, videos, fonts
├── Components/
│   ├── APIs/
│   │   └── APIs.js          # createApi() — all API calls
│   ├── Carousel/
│   ├── Title/
│   └── ...
├── i18n/
│   └── LanguageContext.jsx  # Language context + localStorage persistence
├── Pages/
│   ├── Home/
│   ├── About/
│   ├── OurTeam/
│   ├── OurServices/
│   ├── OurProjects/
│   ├── ProjectDetails/
│   ├── Consultation/
│   └── ContactUs/
├── Translation/
│   ├── en.js               # English strings
│   └── ar.js               # Arabic strings
├── App.jsx
└── main.jsx
index.html
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/blue-brain.git
cd blue-brain
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## ✨ Features

- 🌐 **Bilingual** — Full Arabic / English support with RTL/LTR layout switching
- 💾 **Language persistence** — Selected language saved in `localStorage`
- 📡 **Dynamic data** — All content fetched from REST API (services, team, projects, clients, FAQ, branches)
- 📱 **Fully responsive** — Mobile-first design with Tailwind CSS
- 🎨 **Smooth animations** — Hover effects, transitions, and carousels
- 🗺️ **Google Maps** — Embedded branch maps on the Contact page
- 📩 **Forms** — Contact form, Consultation form, and Service offer form

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, about section, services, projects, clients |
| About | `/about` | Who we are, FAQ accordion, partners logos |
| Our Team | `/team` | Team member cards with social links |
| Our Services | `/services` | Service cards with offer submission form |
| Portfolio | `/Portfolio` | Projects grid with tags and filters |
| Project Details | `/project-details/:id` | Images & video carousels, project info |
| Consultation | `/consultation` | Consultation request form with service types |
| Contact | `/contact` | Branch maps, opening hours, contact form |

---

## 🌍 Internationalization

Language is managed via `LanguageContext` using React Context API.

```jsx
// Use anywhere in the app
const { t, lang, toggleLang } = useLang();

// Access translations
t.services.pageTitle   // "OUR SERVICES" | "خدماتنا"
t.contact.sendBtn      // "Submit" | "إرسال"
```

**Adding a new string:**

1. Add the key to `src/Translation/en.js`
2. Add the Arabic equivalent to `src/Translation/ar.js`
3. Use it in your component via `t.section.key`

**Language is persisted** in `localStorage` under the key `"lang"` — the selected language survives page refreshes.

---

## 🌐 Environment

The API base URL is set inside `src/Components/APIs/APIs.js`.

```js
const BASE_URL = "https://dashbaord.bluebrain-co.com";
```

Update this value if the backend URL changes.

---

## 📞 Contact

| Office | Email | Location |
|---|---|---|
| Egypt | egypt@bluebrain.com | Cairo, Egypt |
| Saudi Arabia | ksa@bluebrain.com | Riyadh, Saudi Arabia |

---

© 2026 Blue Brain. All rights reserved.