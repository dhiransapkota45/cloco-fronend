import {
  ListResponse,
  Pagination,
  Response,
  TArtist,
  TArtistPayload,
} from "@/types";
import axiosInstance from "../axiosInstance";
import { toast } from "@/hooks/use-toast";

export const fetchArtists = async ({ limit, offset }: Pagination) => {
  const { data } = await axiosInstance.get<Response<ListResponse<TArtist>>>(
    `/artist?limit=${limit}&offset=${offset}`
  );
  return data;
};

export const createArtist = async (body: TArtistPayload) => {
  try {
    const { data } = await axiosInstance.post<Response<TArtist>>(
      "/artist/create",
      body
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "Artist created Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to create artist",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to create artist",
    });
  }
};

export const updateArtist = async (
  body: Partial<TArtistPayload>,
  id: number
) => {
  try {
    const { data } = await axiosInstance.patch<Response<TArtist>>(
      `/artist/update/${id}`,
      body
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "Artist updated Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to update artist",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to update artist",
    });
  }
};

export const deleteArtist = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete<Response<TArtist>>(
      `/artist/delete/${id}`
    );
    if (data?.success) {
      toast({
        title: "Success",
        description: data?.message ?? "Artist deleted Successfully",
      });
      return data;
    } else {
      toast({
        title: "Success",
        description: data?.message ?? "Unable to delete artist",
      });
    }
  } catch (error) {
    toast({
      title: "error",
      description: "Unable to delete artist",
    });
  }
};
