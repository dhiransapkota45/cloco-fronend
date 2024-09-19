import { useQuery } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMusic } from "@/service/api/music";
import AddMusic from "./components/AddMusic";
import MusicRow from "./components/MusicRow";
import { LIMIT, QUERY_KEYS } from "@/data/constant";
import CustomPagination from "@/components/Pagination";
import { useState } from "react";
import TableWrapper from "@/components/TableWrapper";

export default function MusicListingPage() {
  const [offset, setOffset] = useState(0);

  const {
    data: music,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.MUSIC],
    queryFn: () => fetchMusic({ limit: LIMIT, offset: offset }),
  });

  if (error) return <div>An error has occurred</div>;

  return (
    <Card className="h-full flex flex-col ">
      <CardHeader className=" flex flex-row items-center justify-between">
        <CardTitle>Music</CardTitle>
        <div>
          <AddMusic header="Add Music" title="Add Music" />
        </div>
      </CardHeader>
      <CardContent className=" flex-1">
        <TableWrapper headers={["S.No", "Title", "Album", "Genre", "Artist", "Action"]} isLoading={isLoading} length={music?.data?.data.length ?? 0}>
          {music?.data?.data?.map((track, index) => (
            <MusicRow offset={offset} key={track.id} index={index} track={track} />
          ))}
        </TableWrapper>
      </CardContent>
      <CardContent>
        <CustomPagination
          totalItems={music?.data?.total ?? 0}
          itemsPerPage={LIMIT}
          currentPage={offset / LIMIT + 1}
          onPageChange={(page) => setOffset((page - 1) * LIMIT)}
        />
      </CardContent>
    </Card>
  );
}
