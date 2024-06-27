import React from "react";
import { MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { Button } from "@mui/material";

export default () => {
  return (
    <div className="h-screen flex justify-center items-center animate-[fadeInAnimation_1s_ease]">
      <MDBContainer className="md:w-3/4 xl:w-1/2">
        <MDBCard>
          <MDBCardBody className="md:text-xl lg:text-2xl">
            You will have 10 verses lined up for you to select the book and
            chapter. For each question, a correct verse of book as well as
            chapter, you will score 1 point, and a correct verse of the verse
            will yield an additional point.
          </MDBCardBody>
        </MDBCard>
        <div className="text-end mt-2">
          <Link to="/">
            <Button
              className="w-24 h-10 md:w-32 md:h-12 gap-2  "
              variant="contained"
              color="info"
            >
              <ArrowCircleLeftRoundedIcon />
              BACK
            </Button>
          </Link>
        </div>
      </MDBContainer>
    </div>
  );
};
