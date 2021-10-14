import IconButton from '@mui/material/IconButton'
import { lighten, Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from './EnhancedTableToolbar.module.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlight:
      theme.palette.mode === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  }),
)

interface Props {
  numSelected: number
}

const EnhancedTableToolbar: React.FC<Props> = ({ numSelected }) => {
  const classes = useStyles()

  return (
    <Toolbar className={`${styles.root} ${numSelected > 0 ? classes.highlight : ''}`}>
      {numSelected > 0 ? (
        <Typography className={styles.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={styles.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" size="large">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar
