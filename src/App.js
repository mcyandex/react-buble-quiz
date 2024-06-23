import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";
import { Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        md={5}
        sm={12}
      >
        <div className="flex justify-center items-center gap-10 sm:gap-16 md:gap-24 xl:gap-32 flex-col sm:flex-row w-full h-screen pt-96 bg-gradient-to-b from-emerald-200 ">
          {loading ? (
            <div className="w-full flex justify-center h-screen items-center">
              <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
