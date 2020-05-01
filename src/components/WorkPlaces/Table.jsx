import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import CustomizedDialogs from './Dialog';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const workplaces1 = [
  {id: 1439, type: 'WINDOW', name: 111, description: 'firstas askldjfl ajsdlj lka ljflasjd fajsl fj sadfsadfsd a s a sasads fas fas',
   deviceId: null, enabled: true,
  autocallEnabled: true},
  {id: 2222, type: 'WINDOW', name: 222, description: 'second', deviceId: null, enabled: true,
  autocallEnabled: true}
]

const menuOperations = ['nam1', 'nam2', 'nam3','nam1', 'nam2', 'nam3','nam1', 'nam2', 'nam3','nam1', 'nam2', 'nam3'];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableDescription: {
    maxWidth: 300,
  }
});

export default function SimpleTable() {
  const classes = useStyles();

  //данные по рабочим местам
  const [workplaces, setWorkplaces] = useState(workplaces1);  
  //модальное окно
  const [openModal, setOpenModal] = React.useState(false);
  //управление данными модального окна
  const [modalData, setModalData] = React.useState({});

  //управление Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

//ошбки полей
  const [error, setError] = useState({
    description: {error: false},

  })  

  //вообще логики слишком много, надо бы обертку сделать
  const handleModalData = (modalData) => (e) => {
    const name = e.target.name;
    switch(name){
      case 'enabled':
      case 'autocallEnabled':
        setModalData({...modalData, [e.target.name]: e.target.checked})
      break;
      case 'type':
      case 'description':
        if(e.target.value.length > 64){
          setError({...error, description: {error: true, helperText:'слишком много символов'} })
        } else if(e.target.value.length <=64 && error.description.error !== false){
          console.log('check');
          setError({ ...error, description: {error: false, helperText:''} })
        }
        setModalData({...modalData, [e.target.name]: e.target.value})
        break; 
      case 'deviceId':
      case 'name':
        setModalData({...modalData, [e.target.name]: e.target.value}) 
      break;   
      default:
        return 
    }
  }

  const handleDelete = (id) => (e) => {
    const newWorkplaces = workplaces.filter((place)=>place.id !== id);
    setWorkplaces(newWorkplaces);
  }

 const handleClickOpenModal = (id) => (e)=> {
  if(id === 'new') {
   const newData = {
    id: "", 
    type: 'WINDOW', 
    name: '', 
    description: 'empty', 
    deviceId: '', 
    enabled: true,
    autocallEnabled: true
   };
    //здесь еще менять флаг isTransferListId
    setModalData(newData);
    setOpenModal(true);
    return;
  };
  const dataId = workplaces.find((elem)=>id===elem.id)
  setModalData(dataId);
  setOpenModal(true);
};

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Номер</TableCell>
            <TableCell align="center" className={classes.tableDescription}>Описание</TableCell>
            <TableCell align="center">Тип</TableCell>
            <TableCell align="center">Device ID</TableCell>
            <TableCell align="center">Включено</TableCell>
            <TableCell align="center">Автовызов</TableCell>
            <TableCell align='center'>Операции</TableCell>
            <TableCell align="center">Редактировать</TableCell>
            <TableCell align="center">Удалить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workplaces.map((data) => (
            <TableRow key={data.id}>
              <TableCell component="th" scope="row" align="center">
                {data.id}
              </TableCell>
              <TableCell align="center">{data.name}</TableCell>
              <TableCell align="center">{data.description}</TableCell>
              <TableCell align="center">{data.type}</TableCell>
              <TableCell align="center">{data.deviceId}</TableCell>
              <TableCell align="center">
              <Checkbox
                disabled
                name='enabled'
                checked={data.enabled}
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                />  
              </TableCell>
              <TableCell align="center">
              <Checkbox
                disabled
                name='autocallEnabled'
                checked={data.autocallEnabled}
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                </TableCell>
              <TableCell align='center'>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Посмотреть
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 500,
                        width: 200,
                      },
                    }}
                  >
                    {menuOperations.map((operation)=><MenuItem>{operation}</MenuItem>)}
                  </Menu>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="primary" onClick={handleClickOpenModal(data.id)}>
                  Настройка
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={handleDelete(data.id)} >Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="outlined" color="primary" onClick={handleClickOpenModal('new')}>
        Новое рабочее место
      </Button>
      <CustomizedDialogs error={error} open={openModal} setOpen={setOpenModal}
       modalData={modalData} workplaces={workplaces} handleModalData={handleModalData}
       />
    </TableContainer>
  );
}