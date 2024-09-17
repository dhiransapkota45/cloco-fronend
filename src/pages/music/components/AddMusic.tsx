import { queryClient } from "@/App";
import CustomInput from "@/components/CustomInput";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { QUERY_KEYS } from "@/data/constant";
import { createMusic } from "@/service/api/music";
import { TMusic } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as z from "zod";
import useMusicFrom from "../hooks/use-music-from";

type props = {
  music?: TMusic;
  title: string;
  header: string;
};

const AddMusic = ({ music, title, header }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const { musicFormInputs, musicFormSchema } = useMusicFrom();
  const form = useForm<z.infer<typeof musicFormSchema>>({
    resolver: zodResolver(musicFormSchema),
  });

  const { mutate: mutateMusic } = useMutation(createMusic, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MUSIC] });
      setOpenModal(false);
    },
  });

  //   const { mutate: mutateUpdateArtist } = useMutation(
  //     ({ body, id }: { body: Partial<TArtistPayload>; id: number }) =>
  //       updateArtist(body, id),
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTIST] });
  //         setOpenModal(false);
  //       },
  //     }
  //   );

  useEffect(() => {
    if (music) {
      //   form.reset(music);
    }
  }, [music]);

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
            // if (artist) {
            //   mutateUpdateArtist({ body: data, id: artist.id });
            // } else {
            mutateMusic({...data, artist_id: Number(data.artist_id)});
            // }
          })}
        >
          {musicFormInputs.map((field) => (
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

export default AddMusic;
