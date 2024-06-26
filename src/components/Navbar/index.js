import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-14 m-3 sm:left-10">
      <Link to="/">
        <div>
          <img
            src={`/assets/images/icon.png`}
            alt="Bible"
            className="w-8 md:w-16 lg:w-20"
          />
        </div>
      </Link>
    </div>
  );
}
