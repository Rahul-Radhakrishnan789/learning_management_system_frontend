import React, { useState } from 'react';
import axios from "../../utils/axiosInstance"
import {Select,MenuItem ,TextField, Button, Container, Typography, Grid } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userType: 'a',
    userFullName: '',
    age: '',
    dob: '',
    gender: 'a',
    course:'a',
    address: '',
    mobileNumber: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log(response.data); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select
              fullWidth
              label="User Type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <MenuItem value="a">select user type</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Full Name"
              name="userFullName"
              value={formData.userFullName}
              onChange={handleChange}
            />
             <Select
              fullWidth
              label="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <MenuItem value="a">select course</MenuItem>
              <MenuItem value="BBA">BBA</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
              <MenuItem value="B.Com">B.Com</MenuItem>
              <MenuItem value="M.Com">M.Com</MenuItem> 
              <MenuItem value="BCA">BCA</MenuItem>
              <MenuItem value="MCA">MCA</MenuItem>
            </Select>
           
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type='date'
              label="DOB"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
         
             <Select
              fullWidth
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="a">select Gender</MenuItem>
              <MenuItem value="student">Male</MenuItem>
              <MenuItem value="teacher">Female</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
