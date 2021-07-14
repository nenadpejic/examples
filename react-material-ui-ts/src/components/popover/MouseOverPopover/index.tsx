import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import styles from './MouseOverPopover.module.css'

const MouseOverPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <div
      // To have the popover stay open even when hovering the popover, set onMouse.. events to the containing div here and add pointer-events: auto to .paper
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
      // To display the popover only when hovering this Typography, set onMouse.. events here and remove pointer-events: auto from .paper
      // onMouseEnter={handlePopoverOpen}
      // onMouseLeave={handlePopoverClose}
      >
        Hover with a Popover.
      </Typography>

      <Popover
        id="mouse-over-popover"
        className={styles.popover}
        classes={{
          paper: styles.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>I use Popover.</Typography>
      </Popover>
    </div>
  )
}

export default MouseOverPopover
