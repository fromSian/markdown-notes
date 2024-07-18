export type AccountType = "base" | "google";
export type Account = {
  email: string;
  image: string | null;
  token: string;
  type: AccountType;
};

export type Step = "email" | "code" | "password" | "success";
