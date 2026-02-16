
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const pageUrl = window.location.href;
const canonical = document.getElementById("canonical-link");
const ogUrl = document.getElementById("og-url");
if (canonical) canonical.setAttribute("href", pageUrl);
if (ogUrl) ogUrl.setAttribute("content", pageUrl);

createRoot(document.getElementById("root")!).render(<App />);
  
