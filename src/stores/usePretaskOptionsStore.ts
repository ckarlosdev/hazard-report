import { create } from "zustand";
import type { PretaskOption } from "../types";

type PretaskOptionsStore = {
  pretaskOptions: PretaskOption[];
  addOrUpdateOption: (options: PretaskOption) => void;
  removePretaskOption: (pretasksCheckboxOptionsId: number) => void;
  updateOtherText: (optionId: number, text: string) => void;
  setFullPretaskOptionsData: (data: PretaskOption[]) => void;
  reset: () => void;
};

const usePretaskOptionsStore = create<PretaskOptionsStore>()((set) => ({
  pretaskOptions: [],
  addOrUpdateOption: (newOption: PretaskOption) =>
    set((state) => {
      const exists = state.pretaskOptions.find(
        (o) =>
          o.pretasksCheckboxOptionsId === newOption.pretasksCheckboxOptionsId
      );

      if (exists) {
        // Si ya existe, podrías actualizarla o no hacer nada
        return state;
      }

      return { pretaskOptions: [...state.pretaskOptions, newOption] };
    }),
  removePretaskOption: (pretasksCheckboxOptionsId: number) =>
    set((state) => ({
      pretaskOptions: state.pretaskOptions.filter(
        (option) =>
          option.pretasksCheckboxOptionsId !== pretasksCheckboxOptionsId
      ),
    })),
  updateOtherText: (optionId: number, text: string) =>
    set((state) => {
      const exists = state.pretaskOptions.find(
        (o) => o.pretasksCheckboxOptionsId === optionId
      );

      if (exists) {
        return {
          pretaskOptions: state.pretaskOptions.map((o) =>
            o.pretasksCheckboxOptionsId === optionId ? { ...o, other: text } : o
          ),
        };
      } else {
        // Usamos "as PretaskOption" para satisfacer al compilador
        const newOption = {
          pretasksOptionsId: null,
          pretasksCheckboxOptionsId: optionId,
          other: text,
        } as PretaskOption;

        return {
          pretaskOptions: [...state.pretaskOptions, newOption],
        };
      }
    }),
  setFullPretaskOptionsData: (data: PretaskOption[]) =>
    set(() => ({ pretaskOptions: data })),
  reset: () => set(() => ({ pretaskOptions: [] })),
}));

export default usePretaskOptionsStore;
