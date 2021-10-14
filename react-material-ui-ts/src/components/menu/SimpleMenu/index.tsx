import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import Collapse from '@mui/material/Collapse'
// import Fade from '@mui/material/Fade'
import Grow from '@mui/material/Grow'
// import Slide from '@mui/material/Slide'
// import Zoom from '@mui/material/Zoom'
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
