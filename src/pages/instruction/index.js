import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default () => {
  return (
    <MDBContainer className="my-5">
      <MDBCard className="m-5">
        <MDBCardBody>
          You will have 10 verses lined up for you to select the book and
          chapter. For each question, a correct selection of book as well as
          chapter, you will score 1 point, and a correct selection of the verse
          will yield an additional point.
        </MDBCardBody>
      </MDBCard>
      <div className="text-end px-5">
        <Link to="/" className="mt-2">
          <MDBIcon fas className="me-2" icon="long-arrow-alt-left" />
          back
        </Link>
      </div>
    </MDBContainer>
  );
};
