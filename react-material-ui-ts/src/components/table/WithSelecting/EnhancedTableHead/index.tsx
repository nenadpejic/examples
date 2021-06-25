import Checkbox from '@material-ui/core/Checkbox'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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
