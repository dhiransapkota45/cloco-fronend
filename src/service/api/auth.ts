import { LoginFormData, LoginResponse, Response, TUser } from "@/types";
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
  } catch (error: any) {
    toast({
      title: "Error",
      description: error?.message ?? "Invalid email or password",
    });
    return null;
  }
};

export const tokenValidate: () => Promise<Response<{user : TUser}> | null> =
  async () => {
    try {
      const response = await axiosInstance.get<Response<{user : TUser}>>(
        "/auth/validate-token"
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };
