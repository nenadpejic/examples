import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import styles from './MyTable.module.css';
import {
  Columns, HandleInteract, MenuOptions, Order, Row, Rows
} from './MyTable.types';
import RowMenuBtn from './RowMenuBtn';

interface Props {
  rows: Rows | undefined
  total: number | undefined
  isLoading: boolean
  columns: Columns<any>
  initialState: {
    page?: number
    rowsPerPage?: number
    order?: Order
    orderBy: string
  }
  menuOptions: MenuOptions
  onInteract: HandleInteract
}

const MyTable: React.FC<Props> = ({
  rows, total, isLoading, columns, initialState, menuOptions, onInteract,
}) => {
  const [page, setPage] = useState(initialState.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(initialState.rowsPerPage || 10);
  const [order, setOrder] = useState<Order>(initialState.order || 'desc');
  const [orderBy, setOrderBy] = useState<keyof Row>(initialState.orderBy);

  const isMenuOptions = Boolean(menuOptions.length);

  useEffect(() => {
    onInteract({
      page,
      rowsPerPage,
      order,
      orderBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page, orderBy, order]);

  const handleClickSort = (property: keyof Row) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <TableContainer classes={{ root: styles.spinner_container }}>
        {isLoading && <div style={{ position: 'absolute' }} >Loading...</div>}

        <Table aria-label="simple table" size="small">
          <EnhancedTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            isMenuOptions={isMenuOptions}
            onClickSort={handleClickSort}
          />

          <TableBody>
            {rows && [...rows].map((row) => (
              <TableRow
                className={`${styles.data_row} ${(row.isActive || row.isActive === undefined) ? '' : styles.data_row__disabled}`}
                key={row.id}
              >
                {[...columns].map((column) => (
                  <TableCell key={column.key as string} align={column.align}>
                    {column.getValue(row)}
                  </TableCell>
                ))}
                {isMenuOptions && (
                  <TableCell align="center">
                    <RowMenuBtn row={row} menuOptions={menuOptions} />
                  </TableCell>
                )}
              </TableRow>
            ))}
            {(isLoading && !rows) && (
              <TableRow style={{ height: 53 * 3 }}>
                <TableCell colSpan={columns.length + 1} />
              </TableRow>
            )}
            {(rows?.length === 0) && (
              <TableRow style={{ height: 53 * 3 }}>
                <TableCell align="center" colSpan={columns.length + 1}>
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                component="td"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={columns.length + 1}
                count={total || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MyTable;
