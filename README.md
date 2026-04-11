# Artemis II FAQ - Mission Control

An immersive, interactive web platform providing detailed answers for the first crewed lunar mission of the Artemis program.

## 🚀 Key Features

*   **Live Mission Dashboard**: Extrapolated telemetry tracking MET (Mission Elapsed Time), velocity, and Earth/Moon distances in real-time.
*   **Bilingual Knowledge Base (EN/FR)**: Comprehensive FAQ covering Mission Basics, Lunar Flyby (April 6-7), Life Aboard, Crew bios, and a technical Lexicon.
*   **Mission Schedule (Planning)**: Hour-by-hour timetable of critical maneuvers and events, synced with the community "Stardust" calendar.
*   **3D Interactive Orion**: Explore the spacecraft in 3D using `Three.js` and `React Three Fiber`.


## ⚙️ Tech, Data & Infra

*   **Core**: React + TypeScript + Vite
*   **UI/UX**: Tailwind CSS + shadcn/ui + Framer Motion
*   **Data Layer**: Recharts (visualization) + @tanstack/react-query (polling, caching, real-time sync)
*   **3D**: Three.js via React Three Fiber & Drei
*   **Data Processing**: Telemetry data transformation & normalization pipeline
*   **Performance**: Lazy loading, memoization, optimized rendering for smooth UX
*   **CI/CD**: GitHub Actions for automated build & deployment
*   **Edge & API**: Cloudflare + Workers as an intelligent proxy for NASA APIs (caching, rate limiting, edge performance)
*   **Analytics**: Google Analytics for real usage insights

## 💻 Quick Start

1.  **Install**: `npm install`
2.  **Dev**: `npm run dev`
3.  **Build**: `npm run build`

## 🤝 Credits

Data compiled from official **NASA/ESA** sources and the **Stardust** community.
*This project is an unofficial, volunteer-run initiative.* 🌌