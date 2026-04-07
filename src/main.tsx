import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4";

// Initialize Google Analytics
ReactGA.initialize(import.meta.env.VITE_GA_ID);

createRoot(document.getElementById("root")!).render(<App />);
