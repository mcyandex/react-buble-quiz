import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

export default function App() {
  return (
    <>
      <div className="animate-[fadeInAnimation_1s_ease] flex flex-col gap-10 md:gap-14 xl:gap-16 justify-center h-screen items-center text-center p-16 sm:pt-40">
        <div className="font-title tracking-widest flex flex-col gap-4 text-5xl md:text-7xl md:gap-8 xl:text-8xl xl:gap-12 text-center text-zinc-700">
          <div>BIBLE</div>
          <div>VERSE</div>
          <div>MASTER</div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Link to="/prepare">
            <div className="font-start text-2xl font-bold md:text-4xl xl:text-5 text-black">
              START
            </div>
          </Link>
          <Link to="/instruction">
            <div className="text-md md:text-2xl xl:text-3xl">Instruction</div>
          </Link>
        </div>
        <div>
          <img
            src={`/assets/images/icon.png`}
            alt="Bible"
            className="w-14 xl:w-20"
          />
        </div>
      </div>
    </>
  );
}
