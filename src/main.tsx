import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4";

// Initialize Google Analytics
ReactGA.initialize("G-T2CSRZX097");

createRoot(document.getElementById("root")!).render(<App />);
