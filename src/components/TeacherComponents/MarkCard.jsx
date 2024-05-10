import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import axios from "../../../utils/axiosInstance"


function MarkCard() {
  const [rows, setRows] = useState([{ value1: '', value2: '', value3: '' }]);

  const handleAddRow = () => {
    const newRow = { value1: '', value2: '', value3: '' };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleCreateTable = async () => {
    try {
        const response =  await axios.post('/api/add-daily-report', rows);
         console.log('Table created successfully:', response.data)
       
       } catch (error) {
         console.error('Error:', error);
       }
     };
  

  return (
    <div>
      <TableContainer component={Paper}>
        <h2> Mark Sheet</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Total Mark</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    value={row.value1}
                    onChange={(e) => handleChange(index, 'value1', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  type='date'
                    value={row.value2}
                    onChange={(e) => handleChange(index, 'value2', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.value3}
                    onChange={(e) => handleChange(index, 'value3', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant="contained" color="primary" onClick={handleAddRow}>
        Add Row
      </Button>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleCreateTable}>
       Create Mark Sheet
      </Button>
    </div>
  );
}

export default MarkCard;