// src/api/auth/index.ts
import { LoginRequest, LoginResponse } from "../../models/auth.model";
import axiosClient from "../axiosClient";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>("/auth/login", data);
  return response.data; // Chỉ trả về dữ liệu từ phản hồi của Axios
};

export const register = async (data: any): Promise<any> => {
  const response = await axiosClient.post<any>("/auth/register", data);
  return response;
};