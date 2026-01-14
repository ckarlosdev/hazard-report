import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import type { Option } from "../types";

const queryOptions = (): Promise<Option[]> => {
  return api.get("v1/ptCheckboxOptions").then((response) => response.data);
};

function useOptions() {
  return useQuery({
    queryKey: ["options"],
    queryFn: queryOptions,
    retry: false,
  });
}

export default useOptions;
