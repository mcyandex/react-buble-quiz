import React from "react";
import { createRoot } from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import MainPage from "./pages/main";
import InstructionPage from "./pages/Instruction";
import PreparePage from "./pages/Prepare";

const container = document.getElementById("root");
const root = createRoot(container);

import "./index.css";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/prepare" element={<PreparePage />} />
        <Route path="/main/:lang/:section" element={<MainPage />} />
        <Route path="/instruction" element={<InstructionPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
