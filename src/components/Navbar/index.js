import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="relative sm:fixed mb-[-96px] sm:mb-0 z-10">
      <div className="flex justify-center">
        <Link to="/">
          <div className="m-3 md:m-5 flex justify-center " md={7} sm={12}>
            <div className="text-center">
                <img
                  src={`/assets/images/icon.png`}
                  alt="Bible"
                  className="w-16 xl:w-20"
                />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
