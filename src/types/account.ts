import { SortInfo } from "./notes";
export type AccountType = "base" | "google";
export type Account = {
  email: string;
  image: string | null;
  token: string;
  type: AccountType;
};

export type Step = "email" | "code" | "password" | "success";

export type Settings = {
  defaultExpanded: boolean;
  showExactTime: boolean;
  sortInfo: SortInfo;
  language: string;
  theme: string;
};
