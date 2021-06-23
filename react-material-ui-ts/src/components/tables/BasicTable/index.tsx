import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import styles from './BasicTable.module.css'
import deserts from './deserts.json'

const BasicTable = () => {

  return (
    <TableContainer className={styles.root} component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deserts.map((desert) => (
            <TableRow key={desert.name}>
              <TableCell>{desert.name}</TableCell>
              <TableCell align="right">{desert.calories}</TableCell>
              <TableCell align="right">{desert.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
