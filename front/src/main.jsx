import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Roots from "./Roots";
import { BrowserRouter as Router } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Roots />
    </Router>
  </StrictMode>,
);
