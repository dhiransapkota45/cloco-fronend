import { useQuery } from 'react-query'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: number
  name: string
  email: string
}

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>('/api/users')
  return data
}

export default function UserListingPage() {
  const { data: users, isLoading, error } = useQuery('users', fetchUsers)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}