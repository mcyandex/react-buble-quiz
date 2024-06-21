import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

export default function Rating() {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol size="3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form action="">
                <p className="text-center">
                  <strong>How do you rate customer support:</strong>
                </p>

                <div className="d-flex justify-content-center my-4">
                  <MDBIcon far icon="star" size="lg" className="text-primary mx-1" />
                  <MDBIcon far icon="star" size="lg" className="text-primary mx-1" />
                  <MDBIcon far icon="star" size="lg" className="text-primary mx-1" />
                  <MDBIcon far icon="star" size="lg" className="text-primary mx-1" />
                  <MDBIcon far icon="star" size="lg" className="text-primary mx-1" />
                </div>

                <p className="text-center">
                  <strong>What could we improve?</strong>
                </p>
                <MDBTextArea label="Your feedback" rows={4} />
              </form>
            </MDBCardBody>
            <MDBCardFooter>
              <div className="text-end">
                <MDBBtn>Submit</MDBBtn>
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
