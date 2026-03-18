import { create } from "zustand";
import type { Activity } from "../types";
import { persist } from "zustand/middleware";

type ActivityStore = {
  activity: Activity;
  setActivity: <K extends keyof Activity>(key: K, value: Activity[K]) => void;
  reset: () => void;
  setFullActivityData: (data: Activity) => void;
};

const initialActivityData: Activity = {
  activitiesId: null,
  activity: "",
  hazards: "",
  controls: "",
};

const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      activity: initialActivityData,
      setActivity: (key, value) =>
        set((state) => ({
          activity: {
            ...state.activity,
            [key]: value,
          },
        })),
      setFullActivityData: (data) =>
        set(() => ({
          activity: {
            activitiesId: data.activitiesId,
            activity: data.activity,
            hazards: data.hazards,
            controls: data.controls,
          },
        })),
      reset: () => set({ activity: initialActivityData }),
    }),
    {
      name: "activity-storage",
    },
  ),
);

export default useActivityStore;
