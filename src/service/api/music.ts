import { Response, TMusic, TMusicPayload } from "@/types";
import axiosInstance from "../axiosInstance";
import { toast } from "@/hooks/use-toast";

export const fetchMusic = async () => {
  const { data } = await axiosInstance.get<Response<TMusic[]>>("/music");
  return data;
};

export const createMusic = async (body: TMusicPayload) => {
  try {
    const { data } = await axiosInstance.post<Response<TMusic>>(
      "/music/create",
      body
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "Music created Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to create music",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to create music",
    });
  }
};

export const updateMusic = async (body: Partial<TMusicPayload>, id: number) => {
  try {
    const { data } = await axiosInstance.patch<Response<TMusic>>(
      `/music/update/${id}`,
      body
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "Music updated Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to update music",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to update music",
    });
  }
};


export const deleteMusic = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete<Response<TMusic>>(`/music/delete/${id}`);
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "Music deleted Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to delete music",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to delete music",
    });
  }
}