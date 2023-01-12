import * as React from 'react';
import './table.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useState, useEffect } from "react";



export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [precio, setPrice] = useState("");
  const [cantidad, setCount] = useState("");
  const [showButtonSave, setShowButtonSave] = useState(true);
  const [showFormData, setShowForm] = useState(true);
  const URL = "http://localhost:3443/vehiculo";

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeYear = (event) => {
    setYear(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeCount = (event) => {
    setCount(event.target.value);
  };

  const showForm = () =>{
    setShowForm(false);
  };

  const saveData = () => {
    if (!showFormData) {
      axios
        .post("http://localhost:3443/addvehiculo", {
          name: name,
          year: year,
          precio: precio,
          cantidad: cantidad
        })
        .then((response) => {
          setShowForm(true);
          setName();
          setYear();
          setCount();
          setPrice();
          getRows();
        });
    }
  }

  const update = () => {
    axios.put(`http://localhost:3443/update/${id}`, {
      name: name,
      year: year,
      precio: precio,
      cantidad: cantidad
    }).then(() => {
      setShowForm(true);
      setName();
      setYear();
      setCount();
      setPrice();
      getRows();
    })
  }

  const edit = (user) => {
    setShowForm(false);
    setShowButtonSave(false)
    setName(user.name);
    setYear(user.year);
    setPrice(user.precio)
    setCount(user.cantidad);
    setId(user.id)
  };

  const canceled = () =>{
    setShowForm(true);
    setName();
    setYear();
    setCount();
    setPrice();
  }

  const getRows = async () => {
    try {
      const { data: response } = await axios.get(URL);
      setRows(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getRows();
  }, []);


  return (
    <Box>
      {!showFormData && (
        <Grid className="App-table">
          <Grid className='sub-App'>
            <Grid>
              <TextField value={name} onChange={onChangeName} id="standard-basic" label="Nombre" variant="standard"/>
            </Grid>

            <Grid>
              <TextField value={year} onChange={onChangeYear} id="standard-basic" label="Año de fabricación" variant="standard"/>
            </Grid>

            <Grid>
              <TextField value={precio}  onChange={onChangePrice} id="standard-basic" label="Precio" variant="standard"/>
            </Grid>

            <Grid>
              <TextField value={cantidad}  onChange={onChangeCount} id="standard-basic" label="Cantidad" variant="standard" />
            </Grid>
          </Grid>

            
            <Grid className='buttons'>
              {showButtonSave && 
                <Grid>
                  <Button 
                  variant="contained"
                  sx={{pl: 6, pr: 6, pt: 1, pb: 1, color: "white", background: "green"}}
                  onClick={() => {saveData()}}
                  >Guardar</Button>
                </Grid>
              }
              {!showButtonSave &&
              <Grid>
                <Button
                  onClick={() => {update()}}
                  variant="outlined"
                  sx={{pl: 6, pr: 6, pt: 1, pb: 1, color: "white", background: "green"}}                > Actualizar </Button>
              </Grid>
              }
              <Grid sx={{ml: 4}}>
                <Button 
                variant="contained"
                sx={{pl: 6, pr: 6, pt: 1, pb: 1, color: "white", background: "red"}}
                onClick={() => {canceled()}}
                >Cancelar</Button>
              </Grid>
          </Grid>
        </Grid>

        
      )}
        

      {showFormData && (
        <Grid container>

          <Grid item sx={{ mb: 4 }}>
            <Button variant="contained" onClick={() => { showForm()}}>Crear Producto</Button>
          </Grid>
          
        

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Nombre del vehiculo</TableCell>
                  <TableCell align="center">Año de fabricación</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    onClick={() => { edit(row); }}
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.year}</TableCell>
                    <TableCell align="center">{row.precio}</TableCell>
                    <TableCell align="center">{row.cantidad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        )}
      </Box>
    
  );
}