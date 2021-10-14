import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import { MenuOption, MenuOptions, Row } from '../MyTable.types';

interface Props {
  row: Row
  menuOptions: MenuOptions
}

const RowMenuBtn: React.FC<Props> = ({ row, menuOptions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = (option: MenuOption) => {
    option.onClick(row);
    handleClose();
  };

  return (
    <>
      <Tooltip title="View more options">
        <IconButton
          aria-controls="row-menu"
          aria-haspopup="true"
          onClick={handleOpen}
          size="large"
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="row-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuOptions.map((option) => (
          <MenuItem key={option.key} onClick={() => handleClickMenuItem(option)}>{option.label}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default RowMenuBtn;
