# Moonshine — Distillation Quest Dashboard

Local-first father–son dashboard for an 8-week, part-time **model distillation** quest. No accounts, no cloud APIs at runtime; progress for **Parent** and **Son** is stored together in `distillation_progress.json` in this folder (via a tiny Vite dev/preview API).

## Run it

```bash
cd moonshine
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**). Use **Start Your Quest** on first launch; data saves automatically after a short debounce.

Production-style local build:

```bash
npm run build
npm run preview
```

Open the **preview** URL (often **http://localhost:4173**) so saving to `distillation_progress.json` still works. Do not open `dist/index.html` as a `file://` page—there is no file API in that mode.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (dark UI)
- **jsPDF** for optional PDF export

---

# moonshine

GitHub: [dmoniker/moonshine](https://github.com/dmoniker/moonshine.git)
