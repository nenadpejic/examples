import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import styles from './TableWithSelecting.module.css'

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const TableWithSelecting = () => {
  const [selected, setSelected] = React.useState<string[]>([])

  const handleClickSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }

  const handleClickSelect = (name: string) => {
    const isIncluded = selected.includes(name)
    let _selected: string[] = []

    if (!isIncluded) {
      _selected = [...selected, name]
    } else {
      _selected = selected.filter(item => item !== name)
    }

    setSelected(_selected)
  }

  return (
    <Paper className={styles.root}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          className={styles.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            rowCount={rows.length}
            onClickSelectAll={handleClickSelectAll}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isSelected = selected.includes(row.name)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  key={row.name}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={isSelected}
                  selected={isSelected}
                  onClick={() => handleClickSelect(row.name)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TableWithSelecting
