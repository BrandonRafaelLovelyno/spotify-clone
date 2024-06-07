import { create } from "zustand";

interface ConfirmationModalStore {
  isOpen: boolean;
  confirm: () => void;
  onConfirm: (confirm: () => void) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmationModal = create<ConfirmationModalStore>((set) => ({
  isOpen: false,
  onConfirm: (confirm) => set({ confirm }),
  confirm: () => {},
  onClose: () => set({ isOpen: false, confirm: () => {} }),
  onOpen: () => set({ isOpen: true }),
}));

export default useConfirmationModal;
