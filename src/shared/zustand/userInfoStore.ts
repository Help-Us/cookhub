import { create } from "zustand";

type UserInfoState = {
  email: string;
  password: string;
  nickname: string;
};

type Action = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
};

export const useUserInfoStore = create<UserInfoState & Action>((set) => ({
  email: "",
  password: "",
  nickname: "",
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
  setNickname: (nickname) => set(() => ({ nickname }))
}));
