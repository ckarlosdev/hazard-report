import { Button, Card, Col, Form, Row } from "react-bootstrap";
import SignatureArea from "./SignatureArea";
import useSignatureStore from "../stores/useSignatureStore";
import useEmployees from "../hooks/useEmployees";

type Props = {};

function Signature({}: Props) {
  const { signatures, assignEmployeeToSignature, removeSignature } =
    useSignatureStore();
  const { data: employees } = useEmployees();

  const handleAssignEmployee = (temporalId: string, employeesId: number) => {
    assignEmployeeToSignature(temporalId, employeesId);
  };

  const employeesFiltered = employees?.filter(
    (emp) =>
      emp.status.toLowerCase() === "active" &&
      (emp.title.toLowerCase() === "labor" ||
        emp.title.toLowerCase() === "supervisor")
  );

  const employeesOrdered = employeesFiltered?.sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  return (
    <div style={{ marginTop: "5px" }}>
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Signature Section
          </Card.Title>
          <Row>
            <Col>
              <SignatureArea />
            </Col>
          </Row>
          <Row className="g-3 mt-1">
            {signatures.map((sig, index) => (
              <Col key={index} xs={6} md={3}>
                <Card className="h-100 shadow-sm border-1">
                  <Card.Header className="p-2 bg-white border-0">
                    <Row className="mt-3">
                      <Col className="d-flex justify-content-end">
                        <Button
                          variant="outline-danger"
                          style={{
                            width: "",
                            height: "30px",
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                          onClick={() => removeSignature(sig.temporalId)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body className="p-1 text-center">
                    <img
                      src={sig.imgData ? sig.imgData : "placeholder.png"}
                      alt={`Firma ${index}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "1px solid #eee",
                      }}
                    />
                  </Card.Body>
                  <Card.Footer className="p-2 bg-white border-0">
                    <Row>
                      <Col>
                        <Form.Select
                          aria-label="Select Employee"
                          value={sig.employeesId || ""}
                          style={{ fontWeight: "bold" }}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              const empId = parseInt(val, 10);
                              handleAssignEmployee(sig.temporalId, empId);
                            }
                          }}
                        >
                          <option>Select name</option>
                          {employeesOrdered?.map((employee) => {
                            const isUsedSomewhere = signatures.some(
                              (s) => s.employeesId === employee.employeesId
                            );
                            const isSelectedInThisRow =
                              sig.employeesId === employee.employeesId;

                            if (isUsedSomewhere && !isSelectedInThisRow) {
                              return null;
                            }
                            return (
                              <option
                                key={employee.employeesId}
                                value={employee.employeesId}
                              >
                                {employee.firstName} {employee.lastName}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signature;
