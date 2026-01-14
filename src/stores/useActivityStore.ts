import { create } from "zustand";
import type { Activity } from "../types";

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

const useActivityStore = create<ActivityStore>()((set) => ({
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
}));

export default useActivityStore;
