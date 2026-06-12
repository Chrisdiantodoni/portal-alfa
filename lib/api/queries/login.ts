import { LoginFormData } from "@/lib/zod/login.schema";
import { api, LaravelResponse } from "../client";
import { ENDPOINTS } from "../endpoints";
import { UserProps } from "@/lib/types/user";

export interface LoginResponse {
  user: UserProps;
  token: string;
  token_type: "Bearer";
}

export async function login(
  data: LoginFormData,
): Promise<LaravelResponse<LoginResponse>> {
  return await api.post<LoginResponse>(ENDPOINTS.login, data);
}

export async function me(): Promise<LaravelResponse<UserProps>> {
  return api.get<UserProps>(ENDPOINTS.me);
}

export async function changePassword(body: Record<string, any>) {
  return api.post(ENDPOINTS.change_password, body);
}
