import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useActivityStore from "../stores/useActivityStore";

type Props = {};

function Activity({}: Props) {
  const { activity, setActivity } = useActivityStore();

  return (
    <div style={{ marginTop: "5px" }}>
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Today's Activities
          </Card.Title>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInputActivities"
                label="Activities"
                className="mb-3"
              >
                <Form.Control
                  value={activity.activity}
                  onChange={(e) => setActivity("activity", e.target.value)}
                  as="textarea"
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  placeholder="#"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInputHazards"
                label="Hazards"
                className="mb-3"
              >
                <Form.Control
                  value={activity.hazards}
                  onChange={(e) => setActivity("hazards", e.target.value)}
                  as="textarea"
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  placeholder="#"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInputSolutions"
                label="Solutions"
                className="mb-3"
              >
                <Form.Control
                  value={activity.controls}
                  onChange={(e) => setActivity("controls", e.target.value)}
                  as="textarea"
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  placeholder="#"
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Activity;
