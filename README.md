# 🌟 NovaStream Live TV

**NovaStream Live TV** is a state-of-the-art, high-performance web application designed for streaming live IPTV channels with zero buffering. It parses M3U playlists directly in your browser and leverages **HLS.js** with low-latency optimizations to deliver an instant, crystal-clear video streaming experience.

---

## ✨ Features

- **⚡ Zero-Buffering HLS Engine**: Powered by `hls.js` with web worker decoding and low-latency buffer tuning for instant playback without stalling.
- **📡 High-Speed M3U Extractor**: Efficiently parses thousands of channels from `https://iptv-org.github.io/iptv/index.m3u` using asynchronous chunked reading and virtualized rendering.
- **🎨 Premium Obsidian Aesthetics**: Deep dark mode theme (`#080c14`), glassmorphism UI cards, glowing cyan/indigo neon highlights, and responsive micro-animations.
- **🔍 Instant Search & Category Filters**: Easily filter channels by categories (*News, Movies, Sports, Music, Kids, Documentary, etc.*) or search by keyword in real time.
- **⭐ Favorites System**: Save your favorite channels with a single click. Your favorites are stored locally in your browser's `localStorage`.
- **🎬 Advanced Player Controls**:
  - Picture-in-Picture (PiP) mode
  - Theater / Wide Mode toggle
  - Aspect Ratio selector (16:9, 4:3, Fill, Fit)
  - Quick Channel Switching (Next / Previous buttons directly on the video player)
- **⌨️ Keyboard Shortcuts**:
  - <kbd>Space</kbd> : Play / Pause
  - <kbd>F</kbd> : Fullscreen
  - <kbd>M</kbd> : Mute / Unmute
  - <kbd>←</kbd> / <kbd>→</kbd> : Previous / Next Channel
  - <kbd>/</kbd> : Focus Search Bar

---

## 🚀 Getting Started

Since NovaStream Live TV is built with pure HTML5, modern CSS3, and Vanilla JavaScript, there is no complicated build step or bundler setup required!

### Option 1: Run with a Local Dev Server (Recommended)
You can serve the folder using any HTTP server:

```bash
# Using Node.js (npx)
npx serve .

# OR using Python
python -m http.server 8000
```
Then open `http://localhost:8000` (or the URL shown in your terminal) in your browser.

### Option 2: Direct File Open
Simply double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).

---

## 🌐 Custom Playlists

By default, NovaStream Live TV loads the official free IPTV-org global playlist:
```
https://iptv-org.github.io/iptv/index.m3u
```
You can also paste any custom `.m3u` or `.m3u8` playlist URL into the top navigation bar and click **Load** to switch playlists dynamically!

---

## 🛠️ Built With

- **HTML5 & Semantic Structure**
- **Vanilla CSS3** (Custom design system, CSS Variables, Glassmorphism, Flexbox/Grid)
- **Vanilla JavaScript (ES6+)** (Async M3U parsing, DOM rendering, Event handling)
- **HLS.js** (HTTP Live Streaming client for web browsers)
- **Lucide Icons & Google Fonts** (Outfit & Plus Jakarta Sans)
