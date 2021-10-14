import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
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
