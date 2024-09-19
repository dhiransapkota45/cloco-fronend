
import TableSkeleton from './TableSkeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table'

type props = {
    children: React.ReactNode
    isLoading: boolean
    headers: string[]
    length: number
}

const TableWrapper = ({ children, headers, isLoading, length }: props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ?
                    <TableSkeleton headerCount={4} /> : length === 0
                        ? ("no data found") : children}
            </TableBody>
        </Table>
    )
}

export default TableWrapper