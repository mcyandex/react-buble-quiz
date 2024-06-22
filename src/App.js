import React from "react";
import { Link } from "react-router-dom";

import "./App.css";
import { Button } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function App() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      md={5}
      sm={12}
    >
      <div className="flex justify-around w-full mt-96">
        <Link to="/before">
          <Button className="w-56 h-12 gap-4" variant="contained" color="secondary">
            <div>Instruction</div>
            <MenuBookIcon />
          </Button>
        </Link>
        <Link to="/instruction">
          <Button className="w-56 h-12 gap-4" variant="contained">
            Start
            <PlayArrowIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
