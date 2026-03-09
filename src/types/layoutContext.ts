import type { Nanny } from "./nannies";

export type LayoutContextType = {
  openLogin: () => void;
  openRegister: () => void;
  openMakeAppointment: (nanny: Nanny) => void;
};