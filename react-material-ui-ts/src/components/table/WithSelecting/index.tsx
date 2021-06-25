import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import deserts from './deserts.json'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import styles from './WithSelecting.module.css'

const WithSelecting = () => {
  const [selected, setSelected] = React.useState<string[]>([])

  const handleClickSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = deserts.map((n) => n.name)
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
            rowCount={deserts.length}
            onClickSelectAll={handleClickSelectAll}
          />
          <TableBody>
            {deserts.map((desert, index) => {
              const isSelected = selected.includes(desert.name)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  key={desert.name}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={isSelected}
                  selected={isSelected}
                  onClick={() => handleClickSelect(desert.name)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">{desert.name}</TableCell>
                  <TableCell align="right">{desert.calories}</TableCell>
                  <TableCell align="right">{desert.fat}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default WithSelecting
