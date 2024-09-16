import { LoginFormData, LoginResponse, Response } from "@/types";
import axiosInstance from "../axiosInstance";
import { toast } from "@/hooks/use-toast";

export const login: (
  data: LoginFormData
) => Promise<Response<LoginResponse> | null> = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post<Response<LoginResponse>>(
      "/auth/login",
      data
    );
    return response.data;
  } catch (error : any) {
    toast({
        title: "Error",
        description: error?.message ?? "Invalid email or password"
    });
    return null
  }
};
