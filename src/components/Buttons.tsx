import { Button, Card, Spinner } from "react-bootstrap";
import useHazardStore from "../stores/useHazardStore";
import useActivityStore from "../stores/useActivityStore";
import usePretaskOptionsStore from "../stores/usePretaskOptionsStore";
import useSignatureStore from "../stores/useSignatureStore";
import { useSaveHazardReport } from "../hooks/useHazardReport";
import { useContextStore } from "../stores/useContextStore";
import "../styles/buttons.css";
import { useAuthStore } from "../hooks/authStore";

type Props = {};

function Buttons({}: Props) {
  const {
    reset: resetHazard,
    hazardReport,
    setFullHazardReport,
  } = useHazardStore();
  const { user: userAuth } = useAuthStore();

  const { reset: resetActivity, activity } = useActivityStore();
  const { reset: resetPretaskOptions, pretaskOptions } =
    usePretaskOptionsStore();
  const { reset: resetSignatures, signatures } = useSignatureStore();
  const { mutate, isPending: isSavingReport } = useSaveHazardReport();
  const jobId = useContextStore((s) => s.jobId);

  const handleSaveReport = () => {
    if (!jobId) {
      alert("Error: Job ID is missing. Cannot save report.");
      return;
    }
    if (!validateCanSave()) return;

    const cleanSignatures = signatures.map((sig) => {
      const img = sig.imgData ?? null;

      let pureBase64: string | null = img;

      if (img && img.includes(",")) {
        pureBase64 = img.split(",")[1] ?? null;
      }

      return {
        ...sig,
        imgData: pureBase64,
      };
    });

    const updatedHazardReport = {
      ...hazardReport,
      userName: "testing UI",
      jobsId: jobId,
      activities: [activity],
      options: pretaskOptions,
      signatures: cleanSignatures,
    };

    setFullHazardReport(updatedHazardReport);
    // console.log("Saving Report:", updatedHazardReport);
    mutate({ reportData: updatedHazardReport });
  };

  const handleReset = () => {
    resetHazard();
    resetActivity();
    resetPretaskOptions();
    resetSignatures();
  };

  const validateCanSave = () => {
    if (hazardReport.date == null) {
      alert("Please select a date for the hazard report.");
      return false;
    }
    if (hazardReport.supervisor === "") {
      alert("Please enter the supervisor's name for the hazard report.");
      return false;
    }
    return true;
  };

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );


  // console.log(userAuth);

  return (
    <div
      style={{ marginTop: "5px", marginBottom: "15px" }}
      className="no-print"
    >
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-primary"
              style={{ width: "150px", fontWeight: "bold" }}
              onClick={() => {
                handleReset();
                window.location.href = `https://ckarlosdev.github.io/binder-webapp/#/binder/${jobId}`;
              }}
            >
              Go Back
            </Button>
            <Button
              variant="outline-primary"
              style={{ width: "150px", fontWeight: "bold" }}
              onClick={() => handleSaveReport()}
              disabled={isSavingReport || !isAuthorized}
            >
              {isSavingReport ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "10px" }}
                  />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Buttons;
