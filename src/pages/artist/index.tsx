import { useQuery } from 'react-query'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Artist {
  id: number
  name: string
  genre: string
}

const fetchArtists = async () => {
  const { data } = await axios.get<Artist[]>('/api/artists')
  return data
}

export default function ArtistListingPage() {
  const { data: artists, isLoading, error } = useQuery('artists', fetchArtists)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Artist Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Genre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists?.map((artist) => (
              <TableRow key={artist.id}>
                <TableCell>{artist.id}</TableCell>
                <TableCell>{artist.name}</TableCell>
                <TableCell>{artist.genre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}