import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

export default function Navbar() {
  return (
    <div className="fixed z-10">
      <div className="">
        <Link to="/">
          <div className="m-5" md={7} sm={12}>
            <div className="text-center">
              <div>
                <img
                  src={`/assets/images/icon.png`}
                  alt="Bible"
                  style={{ width: "10vh", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
