import CustomInput from "@/components/CustomInput";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FieldDetails } from "@/data/user-form";

type props = {
  header: string;
  title: string;
  closeModal: () => void;
  submitHandler: (data: any) => void;
  form: any;
  open: boolean;
  userFormDetails: FieldDetails[];
};

const MutateUser = ({
  header,
  title,
  closeModal,
  submitHandler,
  form,
  open,
  userFormDetails,
}: props) => {
  return (
    <Modal closeModal={closeModal} open={open} header={header} title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          {userFormDetails.map((field) => (
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

export default MutateUser;
