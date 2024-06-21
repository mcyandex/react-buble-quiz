import React from "react";
import { MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

export default function MultipleChoice() {
  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol size="5">
          <form className="bg-white mt-3" action="">
            <p className="fw-bold">How satisfied are you with our product?</p>
            <MDBCheckbox
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Option 1"
              defaultChecked
            />
            <MDBCheckbox
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Option 2"
            />
            <MDBCheckbox
              name="flexRadioDefault"
              id="flexRadioDefault3"
              label="Option 3"
            />
          </form>
          <div className="text-end">
            <MDBBtn>Submit</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
