import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BottomImage from "./components/BottomImage";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <BottomImage />
  </StrictMode>
);
