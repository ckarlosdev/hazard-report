import { useQuery } from "@tanstack/react-query";
import type { Employee } from "../types";
import { api } from "./apiConfig";

const queryEmployees = (): Promise<Employee[]> => {
  return api.get("v1/employee").then((response) => response.data);
};

function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: queryEmployees,
    retry: false,
  });
}

export default useEmployees;
