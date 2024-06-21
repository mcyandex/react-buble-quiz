import React from "react";
import { MDBBtn, MDBContainer, MDBRange } from "mdb-react-ui-kit";

export default function Range() {
  return (
    <MDBContainer style={{ maxWidth: "800px" }}>
      <div className="mx-0 mx-sm-auto">
        <p className="fw-bold text-center">
          Drag the slider to select the number
        </p>

        <label htmlFor="customRange3" className="form-label">
          Bad
        </label>
        <label htmlFor="customRange3" className="form-label float-end">
          Excellent
        </label>

        <MDBRange min="0" max="6" step="1" id="customRange3" />

        <div className="text-end mt-3">
          <MDBBtn>Submit</MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}
