import { queryClient } from "@/App";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/data/constant";
import { deleteUser } from "@/service/api/user";
import { TUser } from "@/types";
import { useState } from "react";
import { useMutation } from "react-query";

const DeleteUser = ({ user }: { user: TUser }) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      () => setOpen(false);
    },
  });

  return (
    <Modal
      closeModal={() => setOpen((prev) => !prev)}
      header="Delete"
      title={`Delete ${user.email}?`}
      open={open}
    >
      <div>Are you sure you want to delete this user?</div>

      <Button onClick={() => mutate(user?.id)} variant={"destructive"}>
        Delete
      </Button>
    </Modal>
  );
};

export default DeleteUser;
