import {
  userFormDetails,
  userFormSchema,
  userUpdateSchema,
} from "@/data/user-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { updateUser } from "@/service/api/user";
import { queryClient } from "@/App";
import { QUERY_KEYS } from "@/data/constant";
import { useEffect, useState } from "react";
import { TUser, TUserPayload } from "@/types";
import MutateUser from "./MutateUser";

type props = {
  header: string;
  title: string;
  userData?: TUser;
};

const UpdateUser = ({ header, title, userData }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userUpdateSchema),
  });

  const { mutate: mutateUpdateUser } = useMutation(
    ({ body, id }: { body: Partial<TUserPayload>; id: number }) =>
      updateUser(body, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
        setOpenModal(false);
      },
    }
  );

  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData]);

  return (
    <MutateUser
      closeModal={() => setOpenModal((prev) => !prev)}
      form={form}
      header={header}
      open={openModal}
      submitHandler={(data) => {
        mutateUpdateUser({ body: data, id: Number(userData?.id) });
      }}
      title={title}
      userFormDetails={userFormDetails.filter(
        (data) => data.name !== "password"
      )}
    />
  );
};

export default UpdateUser;
