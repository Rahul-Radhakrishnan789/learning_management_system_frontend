import React, { useState,useEffect } from 'react';
import { Box, Card, CardContent, Modal, Typography, TextField, Button, Container,List,ListItem,FormControl  } from '@mui/material';
import axios from "../../../utils/axiosInstance"

const Assignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadLine, setDeadline] = useState('');
    const [assignmentList,setAssignmentList] = useState([])
    const [startDate,setStartDate] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        deadLine:""
      });

    console.log("aaaaaa",assignmentList)
    console.log("selectedAssignment",selectedAssignment)

    const handleChangeModal = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
          setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'deadLine') {
          setDeadline(value);
        }else if (name === "startDate"){
            setStartDate(value)
        }
      };
      console.log('Title:', title);
      console.log('assignment Text:', description);
      console.log('Deadline:', deadLine);
    
      const handleSubmit =async () => {

        try {
            const teacherId = localStorage.getItem("teacherId")
            const response = await axios.post(`/addassignment/${teacherId}`, { 
                title,description,deadLine,startDate
            });

            console.log('assignment created:', response.data);

            setTitle('');
           setDescription("")
            setDeadline('');
            setStartDate('');
           
          } catch (error) {

            console.error('Error creating assignment:', error);

          }
      };

      const fetchAssignments = async() => {
        try{

            const teacherId = localStorage.getItem("teacherId")

            const response = await axios.get(`/assignments/teacher/getteacher/${teacherId}`)
            setAssignmentList(response.data.Data)


        }
        catch(error){
            console.error('Error fetching assignment:', error);
        }

      }

      console.log('formData',formData)

      const handleEdit = async (e) => {
        try {
            e.preventDefault();
         
          const response = await axios.put(`/assigment/${selectedAssignment._id}`, {
            formData
          });
          alert(response.data.Data)
          console.log('updated:', response);
    
         
        } catch (error) {
          console.error('Error updating assignment:', error);
        }
      };

      useEffect(() => {
        fetchAssignments();
      },[])

      
      useEffect(() => {
        if (assignmentList.length > 0 && selectedAssignment) {
          const selectedAssignmentData = assignmentList.find((assignment) => assignment._id === selectedAssignment?._id);
          if (selectedAssignmentData) {
            setFormData({
              title: selectedAssignmentData.title,
              description: selectedAssignmentData.description,
              startDate: selectedAssignmentData.startDate,
              deadLine: selectedAssignmentData.deadLine,
             
            });
          } else {
            console.error("Selected assignment not found");
          }
        }
      }, [selectedAssignment?._id]);
  


  return (
    <Box sx={{display:'flex'}}>
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Create Assignment
      </Typography>
      <form>
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
            id="startDate"
            name="startDate"
            label="startDate"
            type="date"
            variant="outlined"
            value={startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
        <br />
        <TextField
          id="homework"
          name="description"
          label="Enter assignment here"
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
        Send assignment
      </Button>
      </form>
    </Box>
    <Box sx={{ marginY: "20%", marginX: "40px", }}>
      <List>
        {assignmentList?.map((assignment) => (
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
                  Start Date: {assignment?.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Deadline: {assignment?.deadLine}
                </Typography>
              </CardContent>
              <CardContent>
              <Button onClick={() => {
                   setOpen(true)
                   setSelectedAssignment(assignment)
              }}>Edit</Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                          }}
                        >
                          <form style={{ width: "100%" }} onSubmit={handleEdit}>
                            <Box sx={sx.form}>
                              <TextField
                                label="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChangeModal}
                                required
                                sx={sx.inputBox}
                              />
                              <FormControl fullWidth>
                                <TextField
                                  label="description"
                                  name="description"
                                  value={formData.description}
                                  onChange={handleChangeModal}
                                  required
                                  sx={sx.inputBox}
                                />
                              </FormControl>
                             
                              <TextField
                                label="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChangeModal}
                                type="date"
                                sx={sx.inputBox}
                              />

                              <TextField
                                label="deadLine"
                                name="deadLine"
                                type="date"
                                value={formData.deadLine}
                                onChange={handleChangeModal}
                                required
                                sx={sx.inputBox}
                              />
                              <Button
                                sx={sx.submitButton}
                                type="submit"
                                variant="contained"
                                // onClick={(e) => handleEdit(e)}
                              >
                                Apply changes
                              </Button>
                            </Box>
                          </form>
                        </Box>
                      </Modal>
  </Box>
  );
};

export default Assignment;

const sx = {
    mainContainer: {
      maxWidth: { xs: "100%", sm: "70%", md: "50%" },
      display: "flex",
      justifyContent: "space-between",
      overflow: "scroll",
      margin: "0 auto",
      padding: { xs: "0", sm: "10px" },
    },
    inputBox: {
      backgroundColor: "white",
      marginBottom: "5%",
      borderRadius: "10px",
    },
    submitButton: {
      width: "100%",
      marginTop: "5%",
      boxShadow: "0px 11px 16.799999237060547px rgba(0, 0, 0, 0.25)",
      borderRadius: 20,
      fontSize: { xs: 10, sm: 14, md: 14, lg: 14 },
      textTransform: "none",
      color: "#fff",
      fontFamily: "var(--font-dmsanslight)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      padding: "5%",
      background: "#BFBFBF",
      borderRadius: "10px",
    },
  };