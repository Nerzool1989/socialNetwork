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

const workplaces1 = [
  {id: 1439, type: 'WINDOW', name: 111, description: 'first', deviceId: null, enabled: true,
  autocallEnabled: true},
  {id: 2222, type: 'WINDOW', name: 222, description: 'second', deviceId: null, enabled: true,
  autocallEnabled: true}
]

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();

  //данные по рабочим местам
  const [workplaces, changeWorkplaces] = useState(workplaces1);  
  //модальное окно
  const [openModal, setOpenModal] = React.useState(false);
  //управление данными модального окна
  const [modalData, setModalData] = React.useState({});

  //вообще логики слишком много, надо бы обертку сделать
  const handleModalData = (modalData) => (e) => {
    console.log(modalData);
    const name = e.target.name;
    switch(name){
      case 'enabled':
      case 'autocallEnabled':
        setModalData({...modalData, [e.target.name]: e.target.checked})
      break;
      case 'type':
      case 'description':
      case 'deviceId':
      case 'name':
        setModalData({...modalData, [e.target.name]: e.target.value}) 
      break;   
      default:
        return 
    }
  }

 const handleClickOpenModal = (id) => (e)=> {
  if(id === 'new') {
   const newData = {
    id: 1, 
    type: 'WINDOW', 
    name: 111, 
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
            <TableCell align="center">Описание</TableCell>
            <TableCell align="center">Тип</TableCell>
            <TableCell align="center">Device ID</TableCell>
            <TableCell align="center">Включено</TableCell>
            <TableCell align="center">Автовызов</TableCell>
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
              <TableCell align="center">
                <Button variant="outlined" color="primary" onClick={handleClickOpenModal(data.id)}>
                  Настройка
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="outlined" color="primary" onClick={handleClickOpenModal('new')}>
        Новое рабочее место
      </Button>
      <CustomizedDialogs open={openModal} setOpen={setOpenModal}
       modalData={modalData} workplaces={workplaces} handleModalData={handleModalData}/>
    </TableContainer>
  );
}