import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useState } from 'react'

const AlertDialog: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return <>
    <Button variant="contained" color="primary" onClick={handleOpen}>
      Open alert dialog
    </Button>

    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={handleClose}>
          Disagree
        </Button>
        <Button variant='contained' color="primary" autoFocus onClick={handleClose}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

export default AlertDialog
