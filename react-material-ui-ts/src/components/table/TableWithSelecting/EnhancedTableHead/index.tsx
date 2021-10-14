import Checkbox from '@mui/material/Checkbox'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

interface Props {
  numSelected: number
  rowCount: number
  onClickSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const EnhancedTableHead: React.FC<Props> = ({ numSelected, rowCount, onClickSelectAll }) => {

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            inputProps={{ 'aria-label': 'select all desserts' }}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onClickSelectAll}
          />
        </TableCell>
        <TableCell padding="none">Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat(g)</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
