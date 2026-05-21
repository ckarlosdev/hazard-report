import { Button } from "react-bootstrap";
import hmbLogo from "../assets/hmbLogo.png";
import "../styles/buttons.css";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "../hooks/authStore";
import useUser from "../hooks/useUser";

type Props = { onPrint: () => void };

function Title({ onPrint }: Props) {
  const { isLoading } = useUser();
  const { user: userAuth } = useAuthStore();

  if (isLoading) return <p>Loading report data...</p>;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <div>
        <img style={{ width: "250px" }} src={hmbLogo} alt="" />
      </div>

      {/* CAMBIO AQUÍ: Usamos Flexbox en lugar de un Grid rígido */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
        className="title-flex-container"
      >
        {/* Columna Izquierda: Botón (se oculta al imprimir) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flex: "1 1 0px", // Mantiene un ancho equilibrado en pantalla
          }}
          className="no-print"
        >
          <Button
            variant="outline-danger"
            onClick={() => onPrint()}
            style={{ fontWeight: "bold" }}
          >
            Print Report (PDF)
          </Button>
        </div>

        {/* Columna Central: El título del reporte */}
        <div style={{ flex: "2 1 0px" }}>
          <h2
            style={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
              fontSize: "1.75rem", // Ajusta si necesitas que entre holgado en una línea
              whiteSpace: "nowrap", // Evita que se rompa en líneas si el espacio es justo
            }}
          >
            Daily Pre-Task Job Hazard Analysis
          </h2>
        </div>

        {/* Columna Derecha: Usuario y Logout (se oculta al imprimir) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
            flex: "1 1 0px", // Mantiene el mismo equilibrio que el lado izquierdo
          }}
          className="no-print"
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: "#6c757d",
              borderRight: "1px solid #dee2e6",
              paddingRight: "15px",
              fontWeight: "500",
            }}
          >
            <span style={{ opacity: 0.7 }}>User: </span>
            <span className="text-dark">{userAuth?.fullName || "Guest"}</span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Title;
