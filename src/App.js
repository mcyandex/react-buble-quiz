import { MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";

// import HomePageLogo from "src/assets/homepage.png";

import "./App.css";

export default function App() {
  return (
    <MDBContainer fluid className="start-page ">
      <MDBRow className="start-page-main">
        <MDBCol className="start-page-title" md={7} sm={12}>
          <div className="text-center">
            <div>
              <img
                src={`/assets/images/icon.png`}
                alt="Bible"
                style={{ width: "10vh", height: "auto" }}
              />
            </div>
            <div className="">B i b l e</div>
            <div className="">V e r s e</div>
            <div className="">M a s t e r</div>
          </div>
        </MDBCol>
        <MDBCol
          className="d-flex align-items-center justify-content-center"
          md={5}
          sm={12}
        >
          <div className="text-center">
            <Link to="/before">
              <div className="start-page-content">
                S T A R T
                <MDBIcon fas className="ms-3" icon="arrow-right" />
              </div>
              {/* <MDBBtn className="m-3 ">START</MDBBtn> */}
            </Link>
            <Link to="/instruction" className="mt-2 text-dark">
              Instruction
              <MDBIcon fas className="ms-2" icon="question" />
            </Link>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
