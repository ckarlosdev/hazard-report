import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useOptions from "../hooks/useOptions";
import usePretaskOptionsStore from "../stores/usePretaskOptionsStore";

type Props = {};

function Issue({}: Props) {
  const { data: optionsData } = useOptions();
  const {
    pretaskOptions,
    addOrUpdateOption,
    removePretaskOption,
    updateOtherText,
  } = usePretaskOptionsStore();

  const issues = optionsData?.filter((option) => option.type === "Issue");
  const otherValue =
    pretaskOptions.find((o) => o.pretasksCheckboxOptionsId === 16)?.other || "";

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: number,
    other: string
  ) => {
    if (e.target.checked) {
      // Si se marca, lo añadimos
      addOrUpdateOption({
        pretasksOptionsId: null,
        pretasksCheckboxOptionsId: optionId,
        other: other, // Valor por defecto
      });
    } else {
      removePretaskOption(optionId);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateOtherText(16, val);
  };

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
            Today's Site Issues
          </Card.Title>
          <Row className="g-4">
            {issues
              ?.filter((issue) => issue.name !== "Other")
              .map((issue) => (
                <Col key={issue.pretasksCheckboxOptionsId} xs={6} md={3}>
                  <Form.Check
                    type="checkbox"
                    label={issue.name}
                    id={issue.pretasksCheckboxOptionsId.toString()}
                    checked={pretaskOptions.some(
                      (opt) =>
                        opt.pretasksCheckboxOptionsId ===
                        issue.pretasksCheckboxOptionsId
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        issue.pretasksCheckboxOptionsId,
                        "N/A"
                      )
                    }
                  />
                </Col>
              ))}
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInputDescriptionIssues"
                label="Other Description"
                className="mb-3"
                style={{ marginTop: "15px" }}
              >
                <Form.Control
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  value={otherValue}
                  type="text"
                  placeholder="#"
                  onChange={handleTextChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Issue;
