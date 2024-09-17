import { queryClient } from "@/App";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/data/constant";
import { deleteMusic } from "@/service/api/music";
import { TMusic } from "@/types";
import { useState } from "react";
import { useMutation } from "react-query";

const DeleteMusic = ({ music }: { music: TMusic }) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation(deleteMusic, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MUSIC] });
      () => setOpen(false);
    },
  });

  return (
    <Modal
      closeModal={() => setOpen((prev) => !prev)}
      header="Delete"
      title={`Delete ${music.title}?`}
      open={open}
    >
      <div>Are you sure you want to delete this music?</div>

      <Button onClick={() => mutate(music?.id)} variant={"destructive"}>
        Delete
      </Button>
    </Modal>
  );
};

export default DeleteMusic;
