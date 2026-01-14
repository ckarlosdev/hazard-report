import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useContextStore } from "../stores/useContextStore";
import useJob from "../hooks/useJob";

type Props = {};

function JobData({}: Props) {
  const { jobId } = useContextStore();
  const { data: job, isLoading, isError } = useJob(jobId ? Number(jobId) : 0);

  if (isLoading) {
    return <div>Loading Job Data...</div>;
  }

  if (isError) {
    return <div>Error loading Job Data.</div>;
  }
  
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Job Data Section
          </Card.Title>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInputJobNumber"
                label="Job Number"
                className="mb-3"
              >
                <Form.Control
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                  readOnly
                  value={job ? job.number : ""}
                  type="text"
                  placeholder="#"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputJobAddress"
                label="Job Address"
                className="mb-1"
              >
                <Form.Control
                  type="text"
                  placeholder="#"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                  readOnly
                  value={job ? job.address : ""}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInputJobName"
                label="Job Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="#"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  readOnly
                  value={job ? job.name : ""}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputContractor"
                label="Contractor"
                className="mb-1"
              >
                <Form.Control
                  type="text"
                  placeholder="#"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  readOnly
                  value={job ? job.contractor : ""}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default JobData;
