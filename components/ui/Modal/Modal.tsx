import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

interface Props {
  open: boolean;
  onClose(): void;
  title?: string;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 6,
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
}));

const CustomModal: React.FC<Props> = ({ children, open, onClose, title }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.header}>
            {title && <Typography variant='h6'>{title}</Typography>}

            <div className={classes.closeContainer}>
              <IconButton aria-label='delete' onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
