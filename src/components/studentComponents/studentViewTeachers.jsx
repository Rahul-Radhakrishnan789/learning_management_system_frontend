import React, { useState,useEffect } from 'react';
import axios from "../../../utils/axiosInstance"
import { Typography, Paper, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';

const Teachers = () => {

    const [teachers,setTeachers] = useState([{name:"athul",email:"razzajbjhd",mobileNumber:"87666"}])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/teacher-profile'); 
            setTeachers(response.data);
          } catch (error) {
            console.error('Error fetching teacher profile data:', error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>
  
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <List>
               <ListItem sx={{ display: 'flex', justifyContent: 'space-between',width:'100vh' }}>
                 
                
                  <Typography variant="h6" component="span" color="text.primary">
                          name
                        </Typography>
                
                        <Typography variant="h6" component="span" color="text.primary">
                          
                          email
                        </Typography>
                        <Typography variant="h6" component="span" color="text.primary" sx={{ ml: 2 }}>
                          
                         contact
                        </Typography>  
                        <Typography variant="h6" component="span" color="text.primary" sx={{ ml: 2 }}>
                          
                          message
                        </Typography>      
                </ListItem>
            </List>
     
      <List>
              {teachers?.map((student, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between',width:'100vh' }}>
                 
                
                  <Typography variant="h6"  color="text.primary">
                          {student?.name}
                        </Typography>
                
                        <Typography variant="body2"  color="text.primary">
                          
                          {student?.email}
                        </Typography>
                        <Typography variant="body2"  color="text.primary" sx={{ ml: 2 }}>
                          
                          {student?.mobileNumber}
                        </Typography>
                     
                 <Button> contact</Button>
       
                </ListItem>
              ))}
            </List>
      </Grid>
    </Grid>
  </div>
  );
};

export default Teachers;
