import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import { Container, Typography, TextField, Button, Box,List,ListItem,Card,CardContent, } from '@mui/material';

const Notice = () => {

    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const [fetchDatas,setFetchDatas] = useState([])


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
          setTitle(value);
        } else if (name === 'description') {
          setdescription(value);
        }else if (name === 'deadline') {
            setDeadline(value);
          }
      };
    
      const handleSubmit = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId")
           await axios.post(`/addnotice/${teacherId}`, { title, description, deadline }); 

          console.log('Notice created successfully');
         setDeadline('')
          setTitle('');
          setdescription('');
        } catch (error) {
          console.error('Error creating notice:', error);
        }
      };

      const fetchData = async() => {
        const teacherId = localStorage.getItem("teacherId")

        const response = await axios.get(`/getnoticetoteacher/${teacherId}`)

        setFetchDatas(response.data.data)

      }

      useEffect(() => {
        fetchData()
      },[])
    
  return (
    <Box sx={{display:'flex'}}>
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifydescription: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Create Notice
      </Typography>
      <Box width="100%">
        <Box mb={2}>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <br />
        <Box mb={2}>
          <TextField
            id="deadline"
            name="deadline"
            label="Deadline"
            type="date"
            variant="outlined"
            value={deadline}
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
        Send Notice
      </Button>
    </Box>
    <Box sx={{ marginY: "20%", marginX: "40px", }}>
      <List>
        {fetchDatas?.map((assignment) => (
          <ListItem key={assignment.id}>
            <Card sx={{width:"300px",minHeight:'150px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {assignment?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap:'break-word'}}>
                  {assignment?.description}
                </Typography> 
                <Typography variant="body2" color="text.secondary">
                  Deadline: {assignment?.expireAt}
                </Typography>
              </CardContent>
              <CardContent>
              {/* <Button onClick={() => {
                   setOpen(true)
                   setSelectedAssignment(assignment)
              }}>Edit</Button> */}
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
  );
};

export default Notice;