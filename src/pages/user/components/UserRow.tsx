import { TableCell, TableRow } from "@/components/ui/table";
import { DAY_FORMAT } from "@/data/constant";
import { TUser } from "@/types";
import dayjs from "dayjs";
import EditUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

type props = {
  user: TUser;
  index : number
};

const UserRow = ({ user, index }: props) => {
  return (
    <TableRow>
      <TableCell>{++index}</TableCell>
      <TableCell>
        {user.first_name} {user.last_name}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{dayjs(user.dob).format(DAY_FORMAT)}</TableCell>
      <TableCell>{user.gender}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className=" flex gap-1">
        <EditUser
          userData={user}
          key={"Edit"}
          header="Edit User"
          title="Edit User"
        />
        <DeleteUser  user={user} />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
