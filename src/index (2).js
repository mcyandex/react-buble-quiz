import React from "react";
import { createRoot } from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import reportWebVitals from "./reportWebVitals";
import Basic from "./components/basic/Basic";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import MultipleChoice from "./components/multipleChoice/MultipleChoice";
import Card from "./components/card/Card";
import CardWithFeedback from "./components/cardWithFeedback/CardWithFeedback";
import Modal from "./components/modal/Modal";
import Rating from "./components/rating/Rating";
import Scale from "./components/scale/Scale";
import Ranking from "./components/ranking/Ranking";
import Range from "./components/range/Range";

import BeforePage from "./pages/before";
import MainPage from "./pages/main";
import InstructionPage from "./pages/instruction";

const container = document.getElementById("root");
const root = createRoot(container);

import "./index.css";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/before" element={<BeforePage />} />
        <Route path="/main/:lang/:section" element={<MainPage />} />
        <Route path="/instruction" element={<InstructionPage />} />

        <Route path="/basic" element={<Basic />} />
        <Route path="/multiple-choice" element={<MultipleChoice />} />
        <Route path="/card" element={<Card />} />
        <Route path="/card-with-feedback" element={<CardWithFeedback />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/scale" element={<Scale />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/range" element={<Range />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
