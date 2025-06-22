# <img src="public/logo.svg" alt="RoastNet Logo" height="32" style="vertical-align:middle;"/> RoastNet

A fun, modern web app to test your internet speed and get a humorous, culturally-aware roast of your results!

---

## 📸 Screenshots
*Add screenshots here!*

---

## 🚀 App Idea
RoastNet lets users:
- Test their internet speed (download & upload)
- Get a personalized, AI-generated roast based on their results
- Enjoy a playful, localized experience (supports Arabic & English)

---

## 🛠️ Tech Stack

| Tech            | Description                        |
|-----------------|------------------------------------|
| <img src="https://vitejs.dev/logo.svg" height="24" style="vertical-align:middle;"/> Vite | Lightning-fast build tool           |
| <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="24" style="vertical-align:middle;"/> React | UI library                          |
| <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" height="24" style="vertical-align:middle;"/> Zustand | State management                    |
| <img src="https://react.i18next.com/~gitbook/image?url=https%3A%2F%2F4236364459-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-L9iS6WpW81N7RGRTQ-K%252Favatar.png%3Fgeneration%3D1523345851027218%26alt%3Dmedia&width=32&dpr=4&quality=100&sign=ba15ca9c&sv=2" height="24" style="vertical-align:middle;"/> i18next | Internationalization                |
| <span style="font-size:24px;vertical-align:middle;">🌐</span> ndt7 | Internet speed test engine          |
| <span style="vertical-align:middle;"> <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_205_3)"><path d="M3 248.945C18 248.945 76 236 106 219C136 202 136 202 198 158C276.497 102.293 332 120.945 423 120.945" stroke-width="90"/><path d="M511 121.5L357.25 210.268L357.25 32.7324L511 121.5Z"/><path d="M0 249C15 249 73 261.945 103 278.945C133 295.945 133 295.945 195 339.945C273.497 395.652 329 377 420 377" stroke-width="90"/><path d="M508 376.445L354.25 287.678L354.25 465.213L508 376.445Z"/></g></svg> </span> OpenRouter | AI roast generation                |

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
