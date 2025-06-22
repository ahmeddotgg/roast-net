# <img src="public/logo.svg" alt="RoastNet Logo" height="32" style="vertical-align:middle;"/> RoastNet

A fun, modern web app to test your internet speed and get a humorous, culturally-aware roast of your results!

---

## 📸 Screenshots
<img src="public/preview.png" style="border-radius: 1rem;"/>


## 🚀 App Idea
RoastNet lets users:
- Test their internet speed (download & upload)
- Get a personalized, AI-generated roast based on their results
- Enjoy a playful, localized experience (supports Arabic & English)

---

## 🛠️ Tech Stack

| Tech            | Description                        |
|-----------------|------------------------------------|
| <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vite.svg" height="24" style="vertical-align:middle;"/> Vite | Lightning-fast build tool           |
| <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/react.svg" height="24" style="vertical-align:middle;"/> React | UI library                          |
| <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/simpleicons.svg" height="24" style="vertical-align:middle;"/> Zustand | State management                    |
| <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/i18next.svg" height="24" style="vertical-align:middle;"/> i18next | Internationalization                |
| <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/internetarchive.svg" height="24" style="vertical-align:middle;"/> ndt7 | Internet speed test engine          |
| <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg" height="24" style="vertical-align:middle;"/> ChatGPT | AI roast generation                |

---

## ⚙️ Example `.env` file

```
VITE_OPENAI_API_KEY=sk-xxxxxxx
```

---

## 🏗️ Build & Run Instructions

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Start development server**
   ```bash
   pnpm dev
   ```
3. **Build for production**
   ```bash
   pnpm build
   ```
4. **Preview production build**
   ```bash
   pnpm preview
   ```

---

## 💡 Features
- Modern UI/UX
- Fun, AI-powered roasts
- Arabic & English support
- Daily usage rate limit (3 tests/24h)
- Cookie-based tracking
