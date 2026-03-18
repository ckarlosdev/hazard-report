import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useEmployees from "../hooks/useEmployees";
import useHazardStore from "../stores/useHazardStore";

type Props = {};

function ReportData({}: Props) {
  const { data: employees } = useEmployees();
  const { hazardReport, setHazardReport } = useHazardStore();

  const employeesFiltered = employees?.filter(
    (emp) =>
      emp.status.toLowerCase() === "active" &&
      emp.title.toLowerCase() === "supervisor"
  );

  const employeesOrdered = employeesFiltered?.sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  return (
    <div style={{ marginTop: "5px" }}>
      <Card>
        <Card.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Report Data
          </Card.Title>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInputDate"
                label="Date"
                className="mb-3"
                style={{ marginTop: "15px" }}
              >
                <Form.Control
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  value={hazardReport.date}
                  onChange={(e) => setHazardReport("date", e.target.value)}
                  type="date"
                  placeholder="#"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInputForeman"
                label="Foreman"
                className="mb-3"
                style={{ marginTop: "15px" }}
              >
                <Form.Select
                  aria-label="Select Foreman"
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "18px",
                  }}
                  value={hazardReport.supervisor}
                  onChange={(e) =>
                    setHazardReport("supervisor", e.target.value)
                  }
                >
                  <option value="">Select foreman</option>
                  {employeesOrdered?.map((employee) => {
                    const fullName = `${employee.firstName} ${employee.lastName}`;

                    return (
                      <option
                        key={employee.employeesId}
                        value={fullName}
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {fullName}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  value={hazardReport.comment || ""}
                  onChange={(e) => setHazardReport("comment", e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReportData;
