import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// import Collapse from '@mui/material/Collapse';
// import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Slide from '@mui/material/Slide';
// import Zoom from '@mui/material/Zoom';
import React, { useState } from 'react';

const BasicMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls="basic-menu"
        aria-haspopup="true"
        endIcon={<KeyboardArrowDownIcon />}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
      >
        Menu
      </Button>

      <Menu
        id="basic-menu"
        TransitionComponent={
          // Collapse
          // Fade
          Grow // default
          // Slide
          // Zoom
        }
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
};

export default BasicMenu;
