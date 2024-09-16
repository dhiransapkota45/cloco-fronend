import { TableCell, TableRow } from "@/components/ui/table";
import { DAY_FORMAT } from "@/data/constant";
import { TArtist } from "@/types";
import dayjs from "dayjs";
import AddArtist from "./AddArtist";
import DeleteArtist from "./DeleteArtist";

type props = {
  artist: TArtist;
  index: number;
};

const ArtistRow = ({ artist, index }: props) => {
  return (
    <TableRow>
      <TableCell>{++index}</TableCell>
      <TableCell>{artist.name}</TableCell>
      <TableCell>{artist.address}</TableCell>
      <TableCell>{artist.first_release_year}</TableCell>
      <TableCell>{dayjs(artist.dob).format(DAY_FORMAT)}</TableCell>
      <TableCell>{artist.gender}</TableCell>
      <TableCell>{artist.address}</TableCell>
      <TableCell className=" flex gap-1">
        <AddArtist
          artist={artist}
          key={"Edit"}
          header="Edit Artist"
          title="Edit Artist"
        />
        <DeleteArtist artist={artist} />
      </TableCell>
    </TableRow>
  );
};

export default ArtistRow;
