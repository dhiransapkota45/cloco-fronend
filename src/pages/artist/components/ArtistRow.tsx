import { TableCell, TableRow } from "@/components/ui/table";
import { DATE_FORMAT, genderMap } from "@/data/constant";
import { TArtist } from "@/types";
import dayjs from "dayjs";
import AddArtist from "./AddArtist";
import DeleteArtist from "./DeleteArtist";

type props = {
  artist: TArtist;
  index: number;
  offset: number;
};

const ArtistRow = ({ artist, index, offset }: props) => {
  return (
    <TableRow>
      <TableCell>{offset + (++index)}</TableCell>
      <TableCell>{artist.name}</TableCell>
      <TableCell>{artist.address}</TableCell>
      <TableCell>{genderMap.get(artist.gender ?? "m")}</TableCell>
      <TableCell>{dayjs(artist.dob).format(DATE_FORMAT)}</TableCell>
      <TableCell>{artist.first_release_year}</TableCell>
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
