import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { Data, Order } from '../types'
import styles from './EnhancedTableHead.module.css'

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
  onClickSort: (property: keyof Data) => void
}

const EnhancedTableHead: React.FC<Props> = ({ order, orderBy, onClickSort }) => {

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
              onClick={() => onClickSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={styles.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
