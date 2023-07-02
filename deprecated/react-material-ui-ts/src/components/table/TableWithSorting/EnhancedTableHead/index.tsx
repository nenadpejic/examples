import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { Data, Order } from '../types'

interface HeadCell {
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  { id: 'name', label: 'Dessert (100g serving)', numeric: false },
  { id: 'calories', label: 'Calories', numeric: true },
  { id: 'fat', label: 'Fat (g)', numeric: true }
]

interface Props {
  order: Order
  orderBy: keyof Data
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
}

const EnhancedTableHead: React.FC<Props> = ({ order, orderBy, onRequestSort }) => {

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
