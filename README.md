# 🚀 BlogVerse Frontend

> **Welcome Interns!** 👋  
> This repository serves as the official frontend application for the **BlogVerse REST API**. As your Senior Developer and mentor, I have set up this repository to help you build a modern, high-performance web application while following industry-standard engineering practices.

---

## 🔗 Backend Repository & API References

Before writing frontend code, it is essential to understand the backend architecture, data models, security expectations, and API contracts.

- 📦 **Backend GitHub Repository**: [https://github.com/acsuthar2006-ctrl/blogverse](https://github.com/acsuthar2006-ctrl/blogverse)
- 🖥️ **Local Backend Server**: `http://localhost:8080/api/v1`
- 📚 **Detailed Backend API Specification**: Refer to [BACKEND_REFERENCE.md](./docs/BACKEND_REFERENCE.md) for full request/response schemas, DTO structures, and auth headers.

---

## 📌 Project Overview

**BlogVerse** is a modern blogging platform backed by a Spring Boot 4 REST API. The API supports JWT authentication, 3 user roles (`ADMIN`, `AUTHOR`, `READER`), category/tag content management, and a dual-strategy comment system (anonymous commenters get an `editToken`, while authenticated users manage comments via JWT).

Your goal as an engineering team is to build a responsive, visually engaging, and accessible single-page web application (SPA) that seamlessly integrates with the BlogVerse backend.

- 🌐 **Frontend Repository**: [https://github.com/acsuthar2006-ctrl/blogverse-frontend](https://github.com/acsuthar2006-ctrl/blogverse-frontend)
- 📦 **Backend Repository**: [https://github.com/acsuthar2006-ctrl/blogverse](https://github.com/acsuthar2006-ctrl/blogverse)

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI Library for building component-driven interfaces |
| **Vite** | Lightning-fast build tool and development server |
| **Vanilla CSS / Custom CSS Tokens** | Scoped styling, glassmorphism design system, dark mode |
| **Lucide React** | Clean, responsive SVG icon set |

---

## 🚀 Getting Started

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/acsuthar2006-ctrl/blogverse-frontend.git
cd blogverse-frontend

# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🗺️ Project Architecture & Directory Structure

Please adhere to this modular folder structure:

```text
src/
├── api/             # API client & endpoint service modules
│   ├── client.js    # Axios / Fetch instance with JWT interceptors
│   ├── auth.js      # Register / Login API calls
│   ├── posts.js     # Post CRUD & filtering
│   ├── comments.js  # Comment CRUD & nested reply handling
│   └── meta.js      # Categories, Tags & Actuator endpoints
├── assets/          # Static media, logos, and global SVGs
├── components/      # Reusable UI components
│   ├── common/      # Navbar, Footer, Buttons, Modals, Badges, Loader
│   ├── posts/       # PostCard, PostGrid, PostDetail, PostEditor
│   └── comments/    # CommentList, CommentItem, CommentForm, EditTokenModal
├── context/         # React Contexts (AuthContext, ThemeContext, ApiContext)
├── hooks/           # Custom React hooks (useAuth, usePosts, useTheme)
├── pages/           # Page views (Home, ArticleDetail, Dashboard, Login)
├── styles/          # Global styles, CSS modules & design tokens
├── App.jsx          # Main application wrapper & routing setup
└── main.jsx         # Application entry point
```

---

## 📋 Sprint Roadmap & Task Allocation

### 🎯 Intern 1: Auth, Layout & Content Navigation
- **Branch**: `feature/auth-and-navigation`
- **Tasks**:
  1. Implement `ThemeContext` for Light/Dark mode toggling.
  2. Build `Header` / `Navbar` with login modal trigger, search input, and responsive mobile drawer.
  3. Implement `AuthContext` and `AuthModal` (`POST /api/v1/auth/login`, `POST /api/v1/auth/register`).
  4. Build category & tag filtering sidebar / pill bar.
  5. Implement Actuator health badge (`GET /api/v1/actuator/health`).

### 🎯 Intern 2: Posts, Rich Editor & Dual Comment System
- **Branch**: `feature/posts-and-comments`
- **Tasks**:
  1. Build `PostGrid` and `PostCard` components for browsing articles (`GET /api/v1/posts`).
  2. Implement `PostDetail` page view with slug routing (`GET /api/v1/posts/{slug}`).
  3. Build `CommentSection` supporting:
     - Anonymous commenting with `editToken` receipt & prompt.
     - Authenticated nested comment replies (`POST /api/v1/comments/{id}/replies`).
     - Comment edit/delete modal using `editToken` or JWT authorization.
  4. Create `PostEditorModal` for authoring & updating posts (`POST /api/v1/posts`, `PUT /api/v1/posts/{slug}`).

---

## 📖 Mentor's Workflow Guidelines & PR Review Process

To ensure high code quality, **no code is merged directly into `main`**. Every feature must be submitted through a **Pull Request (PR)** and reviewed by the Senior Developer.

### 📌 Core Rules for Interns:
1. **Never commit directly to `main`**.
2. **One feature per branch** — keep PRs focused and readable.
3. **Write meaningful commit messages** (e.g. `feat: add AuthContext and login modal`).
4. **Follow the PR template** in `docs/CONTRIBUTING.md` when opening a PR.
5. **Address review comments** before requesting re-review.

Full details on Git workflows, branching strategies, PR templates, and backend endpoint references can be found in:
- 📖 [CONTRIBUTING.md](./docs/CONTRIBUTING.md) — Git workflow, branch naming, code style & PR instructions
- 📡 [BACKEND_REFERENCE.md](./docs/BACKEND_REFERENCE.md) — Complete BlogVerse REST API endpoints, DTO contracts, and authentication guide

---

## 👩‍💻 Support & Code Reviews

If you get stuck or need architectural guidance, feel free to open a draft PR or leave a comment on your PR branch. Happy coding! 🚀
