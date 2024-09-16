import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchUsers } from "@/service/api/user";
import UserRow from "./components/UserRow";
import AddUser from "./components/AddUser";
import { QUERY_KEYS } from "@/data/constant";

export default function UserListingPage() {
  const { data: users, isLoading, error } = useQuery({queryKey : QUERY_KEYS.USER, queryFn : fetchUsers});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <Card>
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle>User Listing</CardTitle>
        <div>
          <AddUser />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.map((user, index) => (
              <UserRow user={user} index={index} key={user?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
