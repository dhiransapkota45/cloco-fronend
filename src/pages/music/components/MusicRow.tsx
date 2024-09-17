import { TableCell, TableRow } from "@/components/ui/table";
import { TMusic } from "@/types";
import AddMusic from "./AddMusic";
import DeleteMusic from "./DeleteMusic";
type props = {
  track: TMusic;
  index: number;
};
const MusicRow = ({ index, track }: props) => {
  return (
    <TableRow>
      <TableCell>{++index}</TableCell>
      <TableCell>{track.title}</TableCell>
      <TableCell>{track.album_name}</TableCell>
      <TableCell>{track.genre}</TableCell>
      <TableCell>{track.artist_name}</TableCell>
      <TableCell className=" flex gap-2">
        <AddMusic music={track} header="Edit Music" title="Edit Music" />
        <DeleteMusic music={track} />
      </TableCell>
    </TableRow>
  );
};

export default MusicRow;
