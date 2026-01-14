import { create } from "zustand";
import type { HazardReport } from "../types";

type HazardReportStore = {
  hazardReport: HazardReport;
  setHazardReport: <K extends keyof HazardReport>(
    key: K,
    value: HazardReport[K]
  ) => void;
  setFullHazardReport: (data: HazardReport) => void;
  reset: () => void;
};

const getTodayDate = () => {
  const date = new Date();
  // Ajustamos la fecha a la zona horaria local para evitar que cambie de día por el UTC
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
  return localISOTime;
};

const initialData = {
  preTasksId: null,
  jobsId: 0,
  userName: "No User",
  date: getTodayDate(),
  supervisor: "",
  comment: "",
  activities: [],
  options: [],
  signatures: [],
};

const useHazardStore = create<HazardReportStore>()((set) => ({
  hazardReport: initialData,
  setHazardReport: (key, value) =>
    set((state) => ({
      hazardReport: {
        ...state.hazardReport,
        [key]: value,
      },
    })),
  setFullHazardReport: (data) =>
    set(() => ({
      hazardReport: data,
    })),
  reset: () =>
    set(() => ({
      hazardReport: initialData,
    })),
}));

export default useHazardStore;
