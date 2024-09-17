import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMusic } from "@/service/api/music";
import AddMusic from "./components/AddMusic";
import MusicRow from "./components/MusicRow";
import { QUERY_KEYS } from "@/data/constant";

export default function MusicListingPage() {
  const {
    data: music,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.MUSIC],
    queryFn: fetchMusic,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <Card>
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle>Music Listing</CardTitle>
        <div>
          <AddMusic header="Add Music" title="Add Music" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {music?.data?.map((track, index) => (
              <MusicRow key={track.id} index={index} track={track} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
