import React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
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
    // NOTE: To have the popover stay open while hovering Typography and Popover, set onMouse events here and add { pointer-events: auto } to .popover_paper
    // onMouseEnter={handlePopoverOpen}
    // onMouseLeave={handlePopoverClose}
    >
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        // To display the popover only when hovering the Typography, set onMouse events here
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        Hover with a Popover.
      </Typography>

      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
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
        <Typography className={styles.popover_paper}>I use Popover.</Typography>
      </Popover>
    </div>
  )
}

export default MouseOverPopover
