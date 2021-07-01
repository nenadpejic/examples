import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
// import Collapse from '@material-ui/core/Collapse'
// import Fade from '@material-ui/core/Fade'
import Grow from '@material-ui/core/Grow'
// import Slide from '@material-ui/core/Slide'
// import Zoom from '@material-ui/core/Zoom'
import React, { useState } from 'react'

const SimpleMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" variant="outlined" onClick={handleOpen}>
        Open Menu
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // keepMounted
        TransitionComponent={
          // Collapse
          // Fade
          Grow
          // Slide
          // Zoom
        }
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default SimpleMenu
