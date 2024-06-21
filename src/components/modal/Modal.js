import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRadio,
  MDBTextArea,
} from "mdb-react-ui-kit";

export default function Modal() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <MDBContainer>
      <div className="d-flex justify-content-center mt-5">
        <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader className="bg-primary">
                <MDBModalTitle className="text-white">
                  Feedback request
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close text-white"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
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
                  <MDBTextArea
                    className="mb-4"
                    label="Message"
                    id="textAreaExample"
                    rows={4}
                  />
                </form>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="primary" outline onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn>Submit</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </MDBContainer>
  );
}
