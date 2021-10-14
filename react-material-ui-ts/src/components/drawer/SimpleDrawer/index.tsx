import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './SimpleDrawer.module.css'

const SimpleDrawer: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const listItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Users', icon: <GroupIcon />, path: '/users' },
  ]

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event?.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsDrawerOpen(open)
  }

  const handleClickItem = (path: string) => {
    history.push(path)
  }

  return <>
    <IconButton aria-label="nav-menu" onClick={toggleDrawer(true)} size="large">
      <MenuIcon />
    </IconButton>

    <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <div
        className={styles.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {listItems.map(listItem => (
            <ListItem key={listItem.text} button onClick={() => handleClickItem(listItem.path)}>
              <ListItemIcon >{listItem.icon}</ListItemIcon>
              <ListItemText primary={listItem.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer >
  </>;
}


export default SimpleDrawer
