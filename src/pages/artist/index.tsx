import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QUERY_KEYS } from "@/data/constant";
import { fetchArtists } from "@/service/api/artist";
import AddArtist from "./components/AddArtist";
import ArtistRow from "./components/ArtistRow";

export default function UserListingPage() {
  const {
    data: artists,
    isLoading,
    error,
  } = useQuery({ queryKey: QUERY_KEYS.ARTIST, queryFn: fetchArtists });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <Card>
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle>Artist Listing</CardTitle>
        <div>
          <AddArtist header="Create Artist" title="Create Artist" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date of birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>address</TableHead>
              <TableHead>First Release Year</TableHead>
              <TableHead>Number of Albums Released</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists?.data?.map((artist, index) => (
              <ArtistRow artist={artist} index={index} key={artist?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// CREATE TABLE IF NOT EXISTS "Artist" (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   dob TIMESTAMP NOT NULL,
//   gender Gender,
//   address VARCHAR(255) NOT NULL,
//   first_release_year INT NOT NULL,
//   no_of_albums_released INT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
