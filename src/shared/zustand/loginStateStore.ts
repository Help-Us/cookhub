import { getLocalStorageValue } from "@/utils/userInfo/getUserInfoFromJSON";
import { create } from "zustand";

type LoginState = {
  loginState: boolean;
};

type Action = {
  login: () => void;
  logout: () => void;
};

export const useLoginStateStore = create<LoginState & Action>((set) => ({
  loginState: !!getLocalStorageValue().access_token,
  login: () => {
    set({ loginState: true });
  },
  logout: () => {
    set({ loginState: false });
    localStorage.clear();
  }
}));
