import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Container, Button, Card, Stack, Row, Col } from "react-bootstrap";
import useSignatureStore from "../stores/useSignatureStore";
import type { Signature } from "../types";
import "../styles/buttons.css";

const SignatureArea = () => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const { addSignature } = useSignatureStore();
  const clear = () => sigCanvas.current?.clear();

  const save = () => {
    if (sigCanvas.current?.isEmpty()) {
      alert("Por favor, proporciona una firma primero.");
    } else {
      const canvas = sigCanvas.current?.getCanvas();

      if (canvas) {
        const newSignature: Signature = {
          temporalId: Date.now().toString(),
          ptSignaturesId: 0,
          employeesId: 0,
          imgData: canvas.toDataURL("image/png"),
        };

        addSignature(newSignature);
        sigCanvas.current?.clear();
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center ">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="no-print">
        <Card.Body className="bg-light p-0">
          {/* El Canvas es el área donde se dibuja */}
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              className: "sigCanvas",
              style: {
                width: "100%",
                height: "300px",
                cursor: "crosshair",
                backgroundColor: "#fff",
              },
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-end"
              >
                <Button
                  variant="outline-secondary"
                  style={{ width: "150px" }}
                  onClick={clear}
                >
                  Limpiar
                </Button>
                <Button
                  variant="outline-secondary"
                  style={{ width: "150px" }}
                  onClick={save}
                >
                  Guardar Firma
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SignatureArea;
