import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable/datatable.esm.js';
import { Column } from 'primereact/column/column.esm.js';
import { InputText } from 'primereact/inputtext/inputtext.esm.js';
import { listTours, listToursByCity, updateTour, deleteTour } from '../../Api/Tours/api-tours.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText} from "@mui/material";
import DialogActions from '@mui/material/DialogActions/DialogActions.js';
import { useNavigate } from "react-router-dom";
import auth from '../../Api/Auth/auth-helper.js';
import "./Tours.css"

function DialogBox({message, open, handleCloseDiag, handleDeleteTour}){
  if(message){
    return(
      <Dialog open={open} onClose={handleCloseDiag}>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }else{
    return(
    <Dialog open={open} onClose={handleCloseDiag}>
      <DialogTitle>{"Delete Tour"}</DialogTitle>
      <DialogContent>
          <DialogContentText>
                Confirm to delete This Tour.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleCloseDiag} >
              Cancel
          </Button>
          <Button onClick={handleDeleteTour}  color="secondary" autoFocus="autoFocus">
              Confirm
          </Button>
      </DialogActions>
    </Dialog>
    )
  }
}

function Tours(){
  const [tours, setTours] = useState([]);
  const [copyTours, setCopyTours] = useState([])
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({})
  const columns = [
    { field: 'city', header: 'City' },
    { field: 'country', header: 'Country' },
    { field: 'date', header: 'Date' },
    { field: 'time', header: 'Time' }
];
  const navigate = useNavigate();

  useEffect(() => {
    listTours().then((data) => {
        if(data && data.error){
          setTours([])
          setMessage(data.error)
        }else{
            setTours(data) 
            setCopyTours(data)
        }
    })
  }, [])

  const onFilter = (e) => {
    const value = e.target.value;
     if(value.length === 0){
       setTours(copyTours)
     }else{
      listToursByCity(value).then((data) => {
        if(data.message){
          setTours([])
          setMessage(data.message)
        }else{
          setTours(data)
        }
       })
     }
    
  };

  const handleCloseDiag = () => {
    setOpen(false)
  }
  
  const handleOpenDiag = (row) =>{
    setRow(row)
    setOpen(true)
  }

  const handleDeleteTour = () => {
    deleteTour(row._id, {t: jwt.token}).then((data) =>{
      if(data && data.error){
        setMessage(data.error)
        setTimeout(()=>{
          setMessage("");
          setOpen(false)
        }, 2000)
      }else{
        setMessage(data.message);
        setTimeout(()=>{
          setMessage("");
          setOpen(false);
          setTours(tours.filter(tour => tour._id !== row._id))
        }, 2000)
      }
    })
    console.log(row)
  }

  const handleClick = () => {
    navigate("/createtour")
  }

  const cellEditor = (options) =>{
    return  <InputText type="text" value={options.value} onChange={(e) => {
      options.editorCallback(e.target.value)}} />;
  }
  const jwt = auth.isAuthenticated();

  const handleEditCellComplete = (e) =>{
    updateTour(e.newRowData._id, {t: jwt.token}, e.newRowData).then((data)=>{
      if(data && data.error){
        setTours([])
        setMessage(data.error)
        setTimeout(()=>{
          setTours(copyTours)
        }, 2000)
      }else{
        const newTour = tours.map(tour => {
          if(tour._id === e.newRowData._id){
            return e.newRowData;
          }
          return tour; 
        })
        setTours(newTour)
      }
    })
  }

  return (
  <>
    <div>
      <div className="p-d-flex p-jc-between p-ai-center">
        <div className='headerTab'>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className="searchBar"  type="search" placeholder="Search by city" onChange={onFilter} />
          </span>
          <Button onClick={handleClick} variant='contained'>Add Tour</Button>
        </div>
      </div>
      <DataTable  selectionMode="single"   value={tours} editMode="cell" emptyMessage={message}>
        {columns.map(({ field, header }) => {
                    return <Column key={field} field={field} header={header}   editor={(options) => cellEditor(options)}  onCellEditComplete={handleEditCellComplete} />;
                })}
        <Column body={row => <Button variant='contained' onClick={() => handleOpenDiag(row)}>Delete</Button>} />
      </DataTable>
    </div>
    <DialogBox 
    message={message} 
    open={open} 
    handleCloseDiag={handleCloseDiag} 
    handleDeleteTour={handleDeleteTour}
    />

  </>)
};

export default Tours;
