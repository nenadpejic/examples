import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import React from 'react'
import styles from './TablePaginationActions.module.css'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={styles.root}>
      <IconButton
        aria-label="first page"
        disabled={page === 0}
        onClick={handleFirstPageButtonClick}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        aria-label="previous page"
        disabled={page === 0}
        onClick={handleBackButtonClick}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        aria-label="next page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleNextButtonClick}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        aria-label="last page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleLastPageButtonClick}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  )
}

export default TablePaginationActions
