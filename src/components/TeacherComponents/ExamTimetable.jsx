import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import axios from "../../../utils/axiosInstance"


function ExamTimeTable() {
  const [rows, setRows] = useState([{ subject: '', date: '', timeslot: '' }]);

  console.log('rows',rows)

  const handleAddRow = () => {
    const newRow = { subject: '', date: '', timeslot: '' };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleCreateTable = async () => {
    try {

        const teacherId = localStorage.getItem("teacherId")
        const response =  await axios.post(`/addtimetable/${teacherId}`, rows);
         console.log('Table created successfully:', response.data)
       
       } catch (error) {
         console.error('Error adding daily report:', error);
       }
     };
  

  return (
    <div>
      <TableContainer component={Paper}>
        <h2> Exam Time Table</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    value={row.subject}
                    onChange={(e) => handleChange(index, 'subject', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  type='date'
                    value={row.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.timeslot}
                    onChange={(e) => handleChange(index, 'timeslot', e.target.value)}
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
       Create Time Table
      </Button>
    </div>
  );
}

export default ExamTimeTable;