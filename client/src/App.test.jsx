import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const rootElement = document.getElement(div);
  const root = createRoot(rootElement);
  root.render(<App />, div);
  root.unmount();
});
