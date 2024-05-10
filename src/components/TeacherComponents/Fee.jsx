import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Modal, Backdrop, Fade } from '@mui/material';
import axios from '../../../utils/axiosInstance';

const Fee = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    DueDate: '',
  });

  const [feeList, setFeeList] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [studentFee,setStudentFee] = useState([])

  console.log('first',studentFee)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      const response = await axios.post(`/addfee/${teacherId}`, formData);
      console.log('Data sent successfully:', response.data);
      setFormData({ title: '', amount: '', DueDate: '' });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const fetchFees = async () => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      const response = await axios.get(`/teacher/getfee/${teacherId}`);
      setFeeList(response.data.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  // fetch paid students

  const paidStudents = async () => {
try{
    const response = await axios.get(`/getallpayedstudents/${selectedFee?._id}`)

    setStudentFee(response.data.data)
}catch(error){
    console.error('Error fetching fees:', error);
}
     

  }

  useEffect(() => {
    fetchFees();
  }, []);

  const handleViewClick = async(fee) => {
    setSelectedFee(fee);
    setOpenModal(true);
   
   
  
  };

  useEffect(() => {
    paidStudents()
  },[selectedFee])

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Enter Fee</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Due Date"
            name="DueDate"
            type="date"
            value={formData.DueDate}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: '10%' }}>
        <Typography variant="h4" align="center">Fee List</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Paid students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeList.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.title}</TableCell>
                  <TableCell>{fee.amount}</TableCell>
                  <TableCell>{fee.DueDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewClick(fee)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
  open={openModal}
  onClose={handleCloseModal}
>
  <Box sx={{ backgroundColor: 'white', padding: '20px', width: '60vh', margin: 'auto', marginTop: '100px', height: '50vh' }}>
    <Typography variant="h5" align="center">Student Details</Typography>
    <Box>
      {studentFee.map((details, index) => (
        <Box key={index}>
          <Box>Student Name: {details?.student.userFullName}</Box>
          <Box>contact Number: {details?.student?.mobileNumber}</Box>
         <br />
        </Box>
      ))}
    </Box>
  </Box>
</Modal>

    </>
  );
};

export default Fee;
