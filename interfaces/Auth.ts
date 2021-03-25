export interface Login {
  email: string;
  password: string;
}
export interface UpdateProfile {
  name: string;
  email: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export type Provider = "github" | "google";
