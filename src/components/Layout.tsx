import { Col, Container, Row, Spinner } from "react-bootstrap";
import Title from "./Title";
import JobData from "./JobData";
import Activity from "./Activity";
import Issue from "./Issue";
import Tool from "./Tool";
import Signature from "./Signature";
import Buttons from "./Buttons";
import { useSearchParams } from "react-router-dom";
import { useContextStore } from "../stores/useContextStore";
import { useEffect, useRef } from "react";
import ReportData from "./ReportData";
import { useGetHazardReport } from "../hooks/useHazardReport";
import useHazardStore from "../stores/useHazardStore";
import useActivityStore from "../stores/useActivityStore";
import usePretaskOptionsStore from "../stores/usePretaskOptionsStore";
import useSignatureStore from "../stores/useSignatureStore";
import { useReactToPrint } from "react-to-print";
import { useMutationState } from "@tanstack/react-query";

type Props = {};

function Layout({}: Props) {
  const isLoaded = useContextStore((s) => s.isLoaded);
  const setIsLoaded = useContextStore((s) => s.setIsLoaded);
  const setIds = useContextStore((s) => s.setIds);
  const { hazardReportId } = useContextStore();

  const [searchParams] = useSearchParams();
  const { data: hazardReportData } = useGetHazardReport(
    hazardReportId ? Number(hazardReportId) : 0
  );

  const { setFullHazardReport } = useHazardStore();
  const { setFullActivityData } = useActivityStore();
  const { setFullPretaskOptionsData } = usePretaskOptionsStore();
  const { setFullSignaturesData } = useSignatureStore();

  useEffect(() => {
    const jobIdParam = searchParams.get("jobId");
    const hazardReportIdParam = searchParams.get("hazardReportId");

    const jobId = jobIdParam ? parseInt(jobIdParam, 10) : null;
    const hazardReportId = hazardReportIdParam
      ? parseInt(hazardReportIdParam, 10)
      : null;

    console.log(" Setting IDs:", { jobId, hazardReportId });

    setIds(jobId, hazardReportId);
    setIsLoaded(true);
  }, [searchParams]);

  useEffect(() => {
    console.log("Hazard Report busqueda");
    if (hazardReportData) {
      console.log("Hazard Report Data:", hazardReportData);
      setFullHazardReport(hazardReportData);
      setFullActivityData(hazardReportData.activities[0]);
      setFullPretaskOptionsData(hazardReportData.options);

      const normalizedSignatures = hazardReportData.signatures.map((sig) => ({
        ...sig,
        temporalId:
          sig.temporalId || `sig-${sig.employeesId || crypto.randomUUID()}`,
        imgData: sig.imgData.startsWith("data:image")
          ? sig.imgData
          : `data:image/png;base64,${sig.imgData}`,
      }));
      setFullSignaturesData(normalizedSignatures);
    }
  }, [hazardReportData]);

  const componenteRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componenteRef,
    documentTitle: "Hazard Report",
  });

  const isSavingReport =
    useMutationState({
      filters: { mutationKey: ["saveHazardReport"], status: "pending" },
      select: (mutation) => mutation.state.status === "pending",
    }).length > 0;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container ref={componenteRef} className="print-container">
        <Row className="justify-content-md-center">
          <Col>
            <Title onPrint={handlePrint} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <JobData />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <ReportData />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Activity />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Issue />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Tool />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Signature />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Buttons />
          </Col>
        </Row>
      </Container>
      {isSavingReport && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "4rem", height: "4rem" }}
          />
          <h4 className="mt-3">Saving Report...</h4>
        </div>
      )}
    </>
  );
}

export default Layout;
