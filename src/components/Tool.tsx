import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useOptions from "../hooks/useOptions";
import usePretaskOptionsStore from "../stores/usePretaskOptionsStore";

type Props = {};

function Tool({}: Props) {
  const { data: optionsData } = useOptions();
  const {
    pretaskOptions,
    addOrUpdateOption,
    removePretaskOption,
    updateOtherText,
  } = usePretaskOptionsStore();

  const tools = optionsData?.filter((option) => option.type === "Tool");
  const otherValue =
    pretaskOptions.find((o) => o.pretasksCheckboxOptionsId === 28)?.other || "";

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
    updateOtherText(28, val);
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
            Tools and Equipments Required
          </Card.Title>
          <Row className="g-4">
            {tools
              ?.filter((tool) => tool.name !== "Other")
              .map((tool) => (
                <Col key={tool.pretasksCheckboxOptionsId} xs={6} md={3}>
                  <Form.Check
                    type="checkbox"
                    label={tool.name}
                    id={tool.pretasksCheckboxOptionsId.toString()}
                    checked={pretaskOptions.some(
                      (opt) =>
                        opt.pretasksCheckboxOptionsId ===
                        tool.pretasksCheckboxOptionsId
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        tool.pretasksCheckboxOptionsId,
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
                controlId="floatingInputDescriptionTools"
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

export default Tool;
