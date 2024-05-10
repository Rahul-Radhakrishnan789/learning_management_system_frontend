import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box, Container,ListItem,ListItemText,List,Card,CardContent} from '@mui/material';
import axios from "../../../utils/axiosInstance"

const Seminar = () => {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [deadLine, setDeadline] = useState('');
    const [seminarList,setseminarList] = useState([])



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
          setTitle(value);
        } else if (name === 'description') {
            setdescription(value);
        } else if (name === 'deadLine') {
          setDeadline(value);
        }
      };
      console.log('Title:', title);
      console.log('seminar Text:', description);
      console.log('Deadline:', deadLine);
    
      const handleSubmit =async () => {

        try {
            const teacherId = localStorage.getItem("teacherId")
            
            const response = await axios.post(`/addseminar/${teacherId}`, {
                title,
                description,
                deadLine
             });

            console.log('seminar created:', response.data);
            
            setTitle('');
            setdescription('');
            setDeadline('');
           
          } catch (error) {

            console.error('Error creating seminar:', error);

          }
       
     
      };

      const fetchSeminars = async() => {

        const teacherId = localStorage.getItem("teacherId")
  
        const response = await axios.get(`/seminar/teacher/getteacher/${teacherId}`)

        setseminarList(response.data.data)

        console.log("seminars",response.data.data)

      }

      useEffect(() => {
        fetchSeminars()
      },[])


  return (
    <Box sx={{display:'flex'}}>
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Create seminar
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
            id="deadLine"
            name="deadLine"
            label="Deadline"
            type="date"
            variant="outlined"
            value={deadLine}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <TextField
          id="homework"
          name="description"
          label="Enter seminar here"
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
        Send seminar
      </Button>
    </Box>
    <Box sx={{ marginY: "20%", marginX: "40px", }}>
      <List>
        {seminarList?.map((seminarList) => (
          <ListItem key={seminarList?.id}>
            <Card sx={{width:"300px",minHeight:'150px'}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {seminarList?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap:'break-word'}}>
                  {seminarList?.description}
                </Typography> 
                <Typography variant="body2" color="text.secondary">
                 {seminarList?.deadLine}
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

export default Seminar;