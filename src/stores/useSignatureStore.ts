import { create } from "zustand";
import type { Signature } from "../types";
import { persist } from "zustand/middleware";

type SignatureStore = {
  signatures: Signature[];
  addSignature: (signature: Signature) => void;
  assignEmployeeToSignature: (temporalId: string, employeesId: number) => void;
  removeSignature: (temporalId: string) => void;
  setFullSignaturesData: (data: Signature[]) => void;
  reset: () => void;
};

const useSignatureStore = create<SignatureStore>()(
  persist(
    (set) => ({
      signatures: [],
      removeSignature: (temporalId) =>
        set((state) => ({
          signatures: state.signatures.filter(
            (sig) => sig.temporalId !== temporalId,
          ),
        })),
      addSignature: (signature: Signature) =>
        set((state) => ({
          signatures: [signature, ...state.signatures],
        })),
      assignEmployeeToSignature: (temporalId, employeesId) =>
        set((state) => ({
          signatures: state.signatures.map((sig) =>
            sig.temporalId === temporalId ? { ...sig, employeesId } : sig,
          ),
        })),
      setFullSignaturesData: (data: Signature[]) =>
        set(() => ({ signatures: data })),
      reset: () => set(() => ({ signatures: [] })),
    }),
    { name: "signatures-storage" },
  ),
);

export default useSignatureStore;
