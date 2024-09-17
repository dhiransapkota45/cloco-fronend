import { queryClient } from "@/App";
import CustomInput from "@/components/CustomInput";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { artistFormDetails, artistFormSchema } from "@/data/artist-form";
import { QUERY_KEYS } from "@/data/constant";
import { createArtist, updateArtist } from "@/service/api/artist";
import { TArtist, TArtistPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as z from "zod";

type props = {
  artist?: TArtist;
  title: string;
  header: string;
};

const AddArtist = ({ artist, title, header }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof artistFormSchema>>({
    resolver: zodResolver(artistFormSchema),
  });

  const { mutate: mutateCreateArtist } = useMutation(createArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTIST] });
      setOpenModal(false);
    },
  });

  const { mutate: mutateUpdateArtist } = useMutation(
    ({ body, id }: { body: Partial<TArtistPayload>; id: number }) =>
      updateArtist(body, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTIST] });
        setOpenModal(false);
      },
    }
  );

  useEffect(() => {
    if (artist) {
      form.reset(artist);
      form.setValue("dob", dayjs(artist.dob).format("YYYY-MM-DD"));
    }
  }, [artist]);

  return (
    <Modal
      closeModal={() => setOpenModal((prev) => !prev)}
      open={openModal}
      header={header}
      title={title}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (artist) {
              mutateUpdateArtist({ body: data, id: artist.id });
            } else {
              mutateCreateArtist({
                ...data,
                first_release_year: data?.first_release_year?.toString(),
                no_of_albums_released: data?.no_of_albums_released?.toString(),
              });
            }
          })}
        >
          {artistFormDetails.map((field) => (
            <CustomInput
              control={form.control}
              key={field.name}
              fielddata={field}
            />
          ))}
          <DialogFooter className=" mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default AddArtist;
