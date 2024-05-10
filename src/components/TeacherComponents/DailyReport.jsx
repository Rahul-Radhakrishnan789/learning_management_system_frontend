import React, { useState,useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Container, Typography, TextField, Button, Box,List,ListItem,Card,CardContent, } from '@mui/material';

const Dailydescription = () => {
    
  const [Date, setDate] = useState('');
  const [description, setdescription] = useState('');
  const [fetchDatas,setFetchDatas] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Date') {
      setDate(value);
    } else if (name === 'description') {
      setdescription(value);
    }
  };

  const handleSubmit = async () => {
    try {
        const teacherId = localStorage.getItem("teacherId")
        const response =  await axios.post(`/adddailyreport/${teacherId}`, {
            Date,description,
        });

        console.log('response',response.data)
        
      console.log('Daily description added successfully');
      setDate('');
      setdescription('');
    } catch (error) {
      console.error('Error adding daily description:', error);
    }
  };

  const fetchData = async() => {
    const teacherId = localStorage.getItem("teacherId")

    const response = await axios.get(`/getdailyreporttoteacher/${teacherId}`)

    setFetchDatas(response.data.data)

  }

  useEffect(() => {
    fetchData()
  },[])



  return (
    <>
    <Box sx={{width:"150vh"}}>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Add Daily description
        </Typography>
        <Box width="100%">
          <Box mb={2}>
            <TextField
              id="Date"
              name="Date"
              label="Date"
              type="Date"
              variant="outlined"
              value={Date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <TextField
            id="description"
            name="description"
            label="description"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={handleChange}
          />
        </Box>
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Send description
        </Button>
      </Box>
      
    </Box>
    <Box>
    <Box sx={{ marginY: "20%", marginX: "40px", }}>
      <List>
        {fetchDatas?.map((report) => (
          <ListItem key={report.id}>
            <Card sx={{width:"500px",minHeight:'150px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {report?.Date}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap:'break-word'}}>
                  {report?.description}
                </Typography> 
               
              </CardContent>
              <CardContent>
              {/* <Button onClick={() => {
                   setOpen(true)
                   setSelectedreport(report)
              }}>Edit</Button> */}
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
  </>
  );
};

export default Dailydescription;

