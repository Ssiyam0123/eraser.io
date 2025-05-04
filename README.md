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
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React](https://lucide.dev/)

### **Editor Tools**
- [Editor.js](https://editorjs.io/) & Plugins:
  - Paragraph, Header, Quote, Checklist, Code, Embed, Image, List, Table
  - [editorjs-undo](https://www.npmjs.com/package/editorjs-undo)
- [Excalidraw](https://github.com/excalidraw/excalidraw)

### **Backend & State**
- [Convex](https://convex.dev/) — serverless data platform
- [@tanstack/react-query](https://tanstack.com/query/latest)

### **Auth**
- [Kinde Auth](https://kinde.com/)

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
