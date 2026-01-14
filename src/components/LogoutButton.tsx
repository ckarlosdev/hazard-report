import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthStore } from "../hooks/authStore";
import { api } from "../hooks/apiConfig";
import useHazardStore from "../stores/useHazardStore";
import useActivityStore from "../stores/useActivityStore";
import usePretaskOptionsStore from "../stores/usePretaskOptionsStore";
import useSignatureStore from "../stores/useSignatureStore";
import "../styles/buttons.css";

type Props = {};

function LogoutButton({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const { reset: resetResport } = useHazardStore();
  const { reset: resetActivities } = useActivityStore();
  const { reset: resetOptions } = usePretaskOptionsStore();
  const { reset: resetSignatures } = useSignatureStore();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (refreshToken) {
        await api.post("/auth/revoke", { refreshToken });
      }
    } catch (error) {
      console.error(
        "Error al revocar token, cerrando sesión localmente...",
        error
      );
    } finally {
      handleReset();
      logout();
      window.location.href = "https://ckarlosdev.github.io/login/";
    }
  };

  const handleReset = () => {
    resetResport();
    resetActivities();
    resetOptions();
    resetSignatures();
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline-danger"
      style={{
        borderRadius: "10px",
        fontWeight: "bold",
        width: "120px",
        height: "40px",
        marginTop: "20px",
      }}
      className="no-print"
    >
      {isLoading ? <span>Logging out</span> : <>Logout</>}
    </Button>
  );
}

export default LogoutButton;
