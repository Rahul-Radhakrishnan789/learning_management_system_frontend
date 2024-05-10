import React,{useState,useEffect} from 'react';
import { Container, Typography, TextField, Button, Box,List,ListItem,ListItemText,ListItemSecondaryAction } from '@mui/material';
import axios from "../../../utils/axiosInstance"
import { Edit, Delete } from '@mui/icons-material';

const Homework = () => {

    const [description, setdescription] = useState('');

    const [homeworks, setHomeworks] = useState([]);

    const [title, setTitle] = useState('');

    const handleChange = (e) => {
      setdescription(e.target.value);
    };

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/homeworks');
          setHomeworks(response.data);
        } catch (error) {
          console.error('Error fetching homeworks:', error);
        }
      };
    
  
    const handleSubmit = async () => {
      try {

        const teacherId = localStorage.getItem("teacherId")
        const response = await axios.post(`/addhomework/${teacherId}`, { description,title });
        console.log('Homework created:', response.data);
      
        setdescription('');
        setTitle("");
      } catch (error) {
        console.error('Error creating homework:', error);
      }
    };


  return (
    <Box  sx={{display:"flex"}}>
        <Box  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
    <Typography variant="h4" gutterBottom>
      Create Homework
    </Typography>
    <Box width="100%">
    <Box mb={2}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>
    <TextField
          id="homework"
          label="Enter homework here"
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
      Send Homework
    </Button>
    </Box>
    <Box sx={{marginY:"20%",marginX:"40px" }}>
    <List>
        {homeworks?.map((homework) => (
          <ListItem key={homework.id}>
            <ListItemText primary={homework.title} secondary={homework.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(homework?.id)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(homework?.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>

  );
};

export default Homework;