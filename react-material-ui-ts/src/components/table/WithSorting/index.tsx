import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import deserts from './deserts.json'
import EnhancedTableHead from './EnhancedTableHead'
import { Data, Order } from './types'
import styles from './WithSorting.module.css'

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }
//   return 0
// }

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy)
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0])
//     if (order !== 0) return order
//     return a[1] - b[1]
//   })
//   return stabilizedThis.map((el) => el[0])
// }

const compareBy = <T extends unknown>(key: keyof T, type: 'asc' | 'desc') => (a: T, b: T) => {
  let res = 0
  if (a[key] < b[key]) {
    res = -1
  } else if (a[key] > b[key]) {
    res = 1
  } else {
    res = 0
  }
  if (type === 'desc' && res !== 0) {
    res = -res
  }
  return res as 0 | -1 | 1
}

const WithSorting = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('calories')

  const handleClickSort = (property: keyof Data) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <TableContainer className={styles.root} component={Paper}>
      <Table className={styles.table} aria-label="enhanced table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onClickSort={handleClickSort}
        />
        <TableBody>
          {// stableSort(deserts, getComparator(order, orderBy))
            deserts
              .sort(compareBy(orderBy, order))
              .map((desert) => (
                <TableRow key={desert.name}>
                  <TableCell component="th" scope="row">{desert.name}</TableCell>
                  <TableCell align="right">{desert.calories}</TableCell>
                  <TableCell align="right">{desert.fat}</TableCell>
                </TableRow>
              )
              )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WithSorting
