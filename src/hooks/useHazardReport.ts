import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { HazardReport } from "../types";
import { publicApi } from "./publicApiConfig";

const createHazardReport = async ({
  reportData,
}: {
  reportData: HazardReport;
}) => {
  if (reportData.preTasksId) {
    console.log("udpating report...");
    return publicApi.put(`v1/pretask`, reportData);
  }
  return publicApi.post(`v1/pretask`, reportData);
};

export function useSaveHazardReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHazardReport,
    mutationKey: ["saveHazardReport"],
    onSuccess: (response) => {
      const newId = response.data.preTasksId;
      queryClient.invalidateQueries({ queryKey: ["hazardReport", newId] });
      alert("Hazard report saved successfully.");
    },
    onError: () => {
      alert("Error saving hazard report.");
    },
  });
}

const queryGetHazardReportById = async (
  preTasksId: number
): Promise<HazardReport> => {
  const { data } = await publicApi.get(`v1/pretask/dto/${preTasksId}`);
  return data;
};

export function useGetHazardReport(preTasksId: number) {
  return useQuery({
    queryKey: ["hazardReport", preTasksId],
    queryFn: () => queryGetHazardReportById(preTasksId),
    enabled: !!preTasksId,
    retry: false,
  });
}
