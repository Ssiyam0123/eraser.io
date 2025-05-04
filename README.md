# ✏️ eraser.io

A collaborative, modern, and beautiful whiteboard/editor app powered by [Editor.js](https://editorjs.io/), [Excalidraw](https://excalidraw.com/), [Convex](https://convex.dev/), and the power of the modern web stack including **Next.js**, **Tailwind CSS**, and **Kinde Auth**.

🔗 **Live Demo:** [https://eraser-io-one.vercel.app/](https://eraser-io-one.vercel.app/)

---

## 🚀 Features

- ✍️ Block-style text editing with Editor.js (Paragraph, Headers, Quotes, Lists, Tables, Code, Checklist, Image embeds)
- 🎨 Visual diagramming with Excalidraw
- 🔐 Authentication with [Kinde Auth](https://kinde.com/)
- 🌈 Theme support using `next-themes`
- 🧠 State management and data fetching with `@tanstack/react-query`
- 📦 Serverless backend powered by [Convex](https://convex.dev/)
- 💡 Realtime collaboration-ready architecture
- 🎛️ Smooth UI/UX with Radix UI, Lucide icons, and DaisyUI
- 🌙 Light & Dark mode toggle

---

## 🛠️ Tech Stack

### **Frontend** 
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) [Next.js 15](https://nextjs.org/)
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) [React 19](https://react.dev/)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) [Tailwind CSS 4](https://tailwindcss.com/)
- ![DaisyUI](https://img.shields.io/badge/DaisyUI-2E2B5F?style=for-the-badge&logo=daisyui&logoColor=white) [DaisyUI](https://daisyui.com/)
- ![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=for-the-badge&logo=radix-ui&logoColor=white) [Radix UI](https://www.radix-ui.com/)
- ![Lucide React](https://img.shields.io/badge/Lucide-Black?style=for-the-badge&logo=lucide&logoColor=white) [Lucide React](https://lucide.dev/)

### **Editor Tools**
- ![Editor.js](https://img.shields.io/badge/Editor.js-F6F6F6?style=for-the-badge&logo=editorjs&logoColor=000) [Editor.js](https://editorjs.io/) & Plugins:
  - Paragraph, Header, Quote, Checklist, Code, Embed, Image, List, Table
  - [editorjs-undo](https://www.npmjs.com/package/editorjs-undo)
- ![Excalidraw](https://img.shields.io/badge/Excalidraw-FF4444?style=for-the-badge&logo=excalidraw&logoColor=white) [Excalidraw](https://github.com/excalidraw/excalidraw)

### **Backend & State**
- ![Convex](https://img.shields.io/badge/Convex-FF2A00?style=for-the-badge&logo=convex&logoColor=white) [Convex](https://convex.dev/)
- ![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) [@tanstack/react-query](https://tanstack.com/query/latest)

### **Auth**
- ![Kinde](https://img.shields.io/badge/Kinde_Auth-1F4690?style=for-the-badge&logo=kinde&logoColor=white) [Kinde Auth](https://kinde.com/)

---

## 📦 Scripts

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Deploy using Convex
npm run deploy

# Build and deploy together
npm run build-and-deploy
