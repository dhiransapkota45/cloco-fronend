import { useQuery } from 'react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchMusic } from '@/service/api/music'
import AddMusic from './components/AddMusic'

export default function MusicListingPage() {
  const { data: music, isLoading, error } = useQuery('music', fetchMusic)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred</div>

  return (
    <Card>
      <CardHeader className=' flex flex-row items-center justify-between'>
        <CardTitle>Music Listing</CardTitle>
        <div>
          <AddMusic header='Add Music' title='Add Music' />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {music?.data?.map((track, index) => (
              <TableRow key={track.id}>
                <TableCell>{++index}</TableCell>
                <TableCell>{track.title}</TableCell>
                <TableCell>{track.album_name}</TableCell>
                <TableCell>{track.genre}</TableCell>
                <TableCell>{track.artist_id}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}