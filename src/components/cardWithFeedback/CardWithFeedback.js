import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

export default function CardWithFeedback() {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol size="6">
          <MDBCard>
            <MDBCardBody>
              <div className="text-center">
                <MDBIcon far icon="file-alt mb-3 text-primary" size="4x" />
                <p>
                  <strong>Your opinion matters</strong>
                </p>
                <p>
                  Have some ideas how to improve our product?
                  <strong>Give us your feedback.</strong>
                </p>
              </div>

              <hr />

              <form className="px-4" action="">
                <p className="text-center">
                  <strong>Your rating:</strong>
                </p>
                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label="Very good"
                  className="mb-2"
                  defaultChecked
                />
                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  label="Good"
                  className="mb-2"
                />
                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  label="Medicore"
                  className="mb-2"
                />
                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                  label="Bad"
                  className="mb-2"
                />
                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault5"
                  label="Very bad"
                  className="mb-2"
                />
                <p className="text-center">
                  <strong>What could we improve?</strong>
                </p>
                <MDBTextArea className="mb-4" label='Message' id='textAreaExample' rows={4} />
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
