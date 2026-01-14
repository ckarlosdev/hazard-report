import { create } from "zustand";
import type { Signature } from "../types";

type SignatureStore = {
  signatures: Signature[];
  addSignature: (signature: Signature) => void;
  assignEmployeeToSignature: (temporalId: string, employeesId: number) => void;
  removeSignature: (temporalId: string) => void;
  setFullSignaturesData: (data: Signature[]) => void;
  reset: () => void;
};

const useSignatureStore = create<SignatureStore>()((set) => ({
  signatures: [],
  removeSignature: (temporalId) =>
    set((state) => ({
      signatures: state.signatures.filter(
        (sig) => sig.temporalId !== temporalId
      ),
    })),
  addSignature: (signature: Signature) =>
    set((state) => ({
      signatures: [signature, ...state.signatures],
    })),
  assignEmployeeToSignature: (temporalId, employeesId) =>
    set((state) => ({
      signatures: state.signatures.map((sig) =>
        sig.temporalId === temporalId ? { ...sig, employeesId } : sig
      ),
    })),
  setFullSignaturesData: (data: Signature[]) =>
    set(() => ({ signatures: data })),
  reset: () => set(() => ({ signatures: [] })),
}));

export default useSignatureStore;
