import React from "react";
import { Link } from "react-router-dom";

import "./App.css";
import { Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function App() {
  return (
    <>
      <div>
        <div className="flex w-full h-screen pt-28 bg-gradient-to-b from-emerald-200">
          <div className="w-full">
            <div className="text-red-500 text-3xl md:text-6xl text-center py-32 md:py-48">
              Bible Verse Master
            </div>
            <div className="flex justify-around items-center w-full gap-5 flex-col sm:flex-row">
              <Link to="/instruction">
                <Button
                  className="w-40 h-12 md:w-48 md:h-14 xl:w-56 xl:h-16 gap-4  "
                  variant="contained"
                  color="info"
                >
                  <div className="text-md md:text-lg xl:text-xl">
                    Instruction
                  </div>
                  <MenuBookIcon />
                </Button>
              </Link>
              <Link to="/before">
                <Button
                  className="w-40 h-12 md:w-48 md:h-14 xl:w-56 xl:h-16 gap-4"
                  variant="contained"
                  color="success"
                >
                  <div className="text-md md:text-lg xl:text-xl">Start</div>
                  <PlayArrowIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
