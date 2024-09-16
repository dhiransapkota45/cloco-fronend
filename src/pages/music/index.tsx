import { useQuery } from 'react-query'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Music {
  id: number
  title: string
  artist: string
  album: string
}

const fetchMusic = async () => {
  const { data } = await axios.get<Music[]>('/api/music')
  return data
}

export default function MusicListingPage() {
  const { data: music, isLoading, error } = useQuery('music', fetchMusic)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Music Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Album</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {music?.map((track) => (
              <TableRow key={track.id}>
                <TableCell>{track.id}</TableCell>
                <TableCell>{track.title}</TableCell>
                <TableCell>{track.artist}</TableCell>
                <TableCell>{track.album}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}