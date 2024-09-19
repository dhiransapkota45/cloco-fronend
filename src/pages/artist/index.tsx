import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LIMIT, QUERY_KEYS } from "@/data/constant";
import { fetchArtists } from "@/service/api/artist";
import AddArtist from "./components/AddArtist";
import ArtistRow from "./components/ArtistRow";
import { useState } from "react";
import CustomPagination from "@/components/Pagination";

export default function UserListingPage() {
  const [offset, setOffset] = useState(0);
  const {
    data: artists,
    isLoading,
    error,
  } = useQuery({ queryKey: QUERY_KEYS.ARTIST, queryFn: () => fetchArtists({ limit: LIMIT, offset: offset }) });

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
      <CardContent className="flex-1">
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
            {artists?.data?.data?.map((artist, index) => (
              <ArtistRow offset={offset} artist={artist} index={index} key={artist?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardContent>
        <CustomPagination
          totalItems={artists?.data?.total ?? 0}
          itemsPerPage={LIMIT}
          currentPage={offset / LIMIT + 1}
          onPageChange={(page) => setOffset((page - 1) * LIMIT)}
        />
      </CardContent>
    </Card>
  );
}
