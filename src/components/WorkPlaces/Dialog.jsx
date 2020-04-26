import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  need: {
    height: 900
  }
}));

function CustomizedDialogs(props) {
  const classes = useStyles();

  const {modalData, setOpen, open, workplaces} = props;
  const {handleModalData} = props;

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog 
      onClose={handleClose}
      disableBackdropClick 
      aria-labelledby="customized-dialog-title" 
      open={props.open}
      fullWidth
      maxWidth='xl'
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Настройка рабочего места
        </DialogTitle>
        <DialogContent dividers>
        <TextField id="outlined-basic" 
        label="Номер окна"
        name = 'name'
        onChange = {handleModalData(modalData)} 
        value={modalData.name} 
        variant="outlined" />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Тип</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name = 'type'
            value={modalData.type}
            onChange={handleModalData(modalData)}
            label="Тип"
          >
            <MenuItem value={'WINDOW'}>WINDOW</MenuItem>
            <MenuItem value={'TABLE'}>TABLE</MenuItem>
          </Select>
        </FormControl>
        <TextField id="outlined-basic" label="Device Id" 
        name = 'deviceId'
        onClick = {handleModalData(modalData)}
        value={modalData.deviceId} 
        variant="outlined" />
        <FormControlLabel
        labelPlacement='top'
          control={<Checkbox
                  name='enabled'
                  checked={modalData.enabled}
                  onChange={handleModalData(modalData)}
                  color="default"
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
          />}
          label='Включено'  
        />
        <FormControlLabel
        labelPlacement='top'
          control={<Checkbox
                name='autocallEnabled'
                checked={modalData.autocallEnabled}
                onChange={handleModalData(modalData)}
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                />}
                label='Автовызов'
        />
        <TextField id="outlined-basic"
        disabled 
        label="ID"
        value={modalData.id} 
        variant="outlined" />
        <TextField id="outlined-basic" label="Описание" 
        name ='description' 
        onChange = {handleModalData(modalData)}
        value={modalData.description} 
        variant="outlined"
          fullWidth />
        <div className={classes.need}>asdf</div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;