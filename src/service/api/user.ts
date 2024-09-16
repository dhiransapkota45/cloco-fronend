import { Response, TUser, TUserPayload } from "@/types";
import axiosInstance from "../axiosInstance";
import { toast } from "@/hooks/use-toast";

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get<Response<TUser[]>>("/user");
  return data;
};

export const createUser = async (body: TUserPayload) => {
  console.log(body)
  try {
    const { data } = await axiosInstance.post<Response<TUser>>(
      "/user/create",
      body
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "User created Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to create user",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to create user",
    });
  }
};

export const updateUser = async (body: Partial<TUserPayload>, id: number) => {
  try {
    const { data } = await axiosInstance.patch<Response<TUser>>(
      `/user/update/${id}`,
      body
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "User updated Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to update user",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to update user",
    });
  }
};


export const deleteUser = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete<Response<TUser>>(`/user/delete/${id}`);
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "User deleted Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to delete user",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to delete user",
    });
  }
}