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
import { LIMIT, QUERY_KEYS } from "@/data/constant";
import CustomPagination from "@/components/Pagination";
import { useState } from "react";

export default function UserListingPage() {
  const [offset, setOffset] = useState(0);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER, offset],
    queryFn: () => fetchUsers({ limit: LIMIT, offset: offset }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <Card className="h-full flex flex-col ">
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle>Users</CardTitle>
        <div>
          <AddUser />
        </div>
      </CardHeader>
      <CardContent className=" flex-1">
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
            {users?.data?.data?.map((user, index) => (
              <UserRow user={user} index={index} key={user?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardContent>
        <CustomPagination
          totalItems={users?.data?.total ?? 0}
          itemsPerPage={LIMIT}
          currentPage={offset / LIMIT + 1}
          onPageChange={(page) => setOffset((page - 1) * LIMIT)}
        />
      </CardContent>
    </Card>
  );
}
