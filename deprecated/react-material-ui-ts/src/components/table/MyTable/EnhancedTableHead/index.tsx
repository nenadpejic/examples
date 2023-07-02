import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { Columns, Order, Row } from '../MyTable.types';

interface Props {
  columns: Columns<unknown>
  order: Order
  orderBy: keyof Row
  isMenuOptions: boolean
  onClickSort: (property: keyof Row) => void
}

const EnhancedTableHead: React.FC<Props> = ({
  columns, order, orderBy, isMenuOptions, onClickSort,
}) => {

  const handleClickSort = (property: keyof Row) => {
    onClickSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align}
            sortDirection={orderBy === column.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.key}
              direction={orderBy === column.key ? order : 'asc'}
              onClick={() => handleClickSort(column.key)}
            >
              {column.label}
              {orderBy === column.key ? (
                <Box sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {isMenuOptions && <TableCell align="right" />}
      </TableRow>
    </TableHead>
  )
};

export default EnhancedTableHead;
