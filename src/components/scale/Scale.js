import React from "react";
import { MDBBtn, MDBContainer, MDBRadio } from "mdb-react-ui-kit";

export default function Scale() {
  return (
    <MDBContainer className="d-flex justify-content-center">
      <div className="mx-0 mx-sm-auto">
        <form className="bg-white mt-3" action="">
          <p className="fw-bold text-center">
            How satisfied are you with our product?
          </p>

          <div className="text-center">
            <div className="d-inline mx-3">Bad</div>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="1"
              inline
              defaultChecked
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="2"
              inline
              defaultChecked
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault3"
              label="3"
              inline
              defaultChecked
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault4"
              label="4"
              inline
              defaultChecked
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault5"
              label="5"
              inline
              defaultChecked
            />
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault6"
              label="6"
              inline
              defaultChecked
            />
            <div className="d-inline mx-3">Excellent</div>
          </div>
        </form>
        <div className="text-end">
          <MDBBtn>Submit</MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}
