import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './SimpleDrawer.module.css'

const SimpleDrawer: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const listItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/'
    },
    {
      text: 'Users',
      icon: <GroupIcon />,
      path: '/users'
    },
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

  return (
    <>
      <IconButton aria-label="nav-menu" onClick={toggleDrawer(true)} >
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
    </>
  )
}


export default SimpleDrawer
