import React, { useState } from 'react';
import axios from "../../utils/axiosInstance"
import { TextField, Button, Container, Typography, Grid,Select,MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'a'
  });

  const [errors, setErrors] = useState({});

  const nav = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
      }
    try {
      const response = await axios.post('/login', formData); 
      console.log(response.data);

      if(response.data.type == "teacher"){
        localStorage.setItem("teacherId",response.data.id)
        nav("/teacherdashboard")
      }

      if(response.data.type == "student"){
        localStorage.setItem("studentId",response.data.id)
        nav("/studentdashboard")
      }
 
     
    
    
    } catch (err) {
      console.error(err);
    }
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

   
    
      if (!formData.password) {
        newErrors.password = 'Password is required';
        valid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
        valid = false;
      }
   
    if (formData.userType === 'a') {
      newErrors.userType = 'User type is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  return (
    <Container sx={{marginLeft:"40%"}}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
             {errors.email && <Typography color="error">{errors.email}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
             {errors.password && <Typography color="error">{errors.password}</Typography>}
          </Grid>
         
          <Grid item xs={12}>
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
            {errors.userType && <Typography color="error">{errors.userType}</Typography>}
            </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
