import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MyDrawerWithPopover.module.css';

interface IListItem {
  icon: JSX.Element
  text: string
  path?: string
  subListItems?: {
    text: string
    path: string
  }[]
}

const MyDrawerWithPopover: React.FC = () => {
  const history = useHistory();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const isSubListOpen = Boolean(anchorEl);

  const listItems: IListItem[] = [
    { icon: <HomeIcon />, text: 'Home', path: '/' },
    {
      icon: <GroupIcon />,
      text: 'Todos',
      subListItems: [
        { text: 'View Todos', path: '/todos/view' },
        { text: 'Create Todo', path: '/todos/create' },
      ],
    },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
    if (!open) {
      setAnchorEl(null);
    }
  };

  const handleClickItem = (path?: string) => {
    if (path) {
      history.push(path);
    }
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(!isDrawerOpen)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        keepMounted
        className={styles.drawer}
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <nav
          className={styles.list_container}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {listItems.map((listItem) => (
              <ListItem
                key={listItem.text}
                button
                data-tag={listItem.text}
                component="li"
                aria-owns={(listItem.subListItems && isSubListOpen) ? 'nav-drawer-popover' : undefined}
                aria-haspopup={listItem.subListItems ? 'true' : undefined}
                onClick={() => handleClickItem(listItem.path)}
                onMouseEnter={listItem.subListItems && handlePopoverOpen}
                onMouseLeave={listItem.subListItems && handlePopoverClose}
              >
                <ListItemIcon>{listItem.icon}</ListItemIcon>
                <ListItemText primary={listItem.text} />
                {listItem.subListItems && <NavigateNextIcon />}
                {listItem.subListItems && (anchorEl?.dataset.tag === listItem.text) && (
                  <Popover
                    disableRestoreFocus
                    id="nav-drawer-popover"
                    sx={{ pointerEvents: 'none' }}
                    classes={{ paper: styles.paper }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={isSubListOpen}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                  >
                    <List>
                      {listItem.subListItems.map((subListItem) => (
                        <ListItem
                          key={subListItem.text}
                          button
                          component="li"
                          onClick={() => handleClickItem(subListItem.path)}
                        >
                          <ListItemText className={styles.list_item_text} primary={subListItem.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Popover>
                )}
              </ListItem>
            ))}
          </List>
          <Divider />
        </nav>
      </Drawer>
    </>
  );
};

export default MyDrawerWithPopover;
