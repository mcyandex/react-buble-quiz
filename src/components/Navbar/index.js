import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div className="absolute top-7 m-5 ms-4 sm:left-10">
      <div onClick={handleOpen}>
        <img
          src={`/assets/images/icon.png`}
          alt="Bible"
          className="w-8 md:w-16 lg:w-20"
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col items-middle h-screen">
          <div className="min-w-72 w-1/2 bg-white m-auto p-7">
            <div className="text-center text-sm lg:text-lg py-7">
              Are you sure you want to leave the current Bible Verse Master
              session?
            </div>
            <div className="flex justify-between md:justify-end gap-3">
              <Button
                className="text-sm lg:text-lg"
                sx={{fontSize: "12px", padding: "5px"}}
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                Yes
              </Button>
              <Button
                className="text-sm lg:text-lg"
                sx={{fontSize: "12px", padding: "5px"}}
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
