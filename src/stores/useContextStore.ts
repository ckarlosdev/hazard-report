import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppContext {
  jobId: number | null;
  hazardReportId: number | null;
  isLoaded: boolean;
  setIds: (jobId: number | null, reportId: number | null) => void;
  setIsLoaded: (loaded: boolean) => void;
}

export const useContextStore = create<AppContext>()(
  persist(
    (set) => ({
      jobId: null,
      hazardReportId: null,
      isLoaded: false,
      setIds: (jobId, reportId) =>
        set(() => ({ jobId, hazardReportId: reportId })),
      setIsLoaded: (loaded) => set(() => ({ isLoaded: loaded })),
    }),
    {
      name: "app-context-store",
    }
  )
);
