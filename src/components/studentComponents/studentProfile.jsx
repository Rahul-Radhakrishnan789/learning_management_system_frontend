import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import axios from "../../../utils/axiosInstance";

const StudentProfile = () => {
    const [studentData, setStudentData] = useState(null);

    console.log('studentData',studentData)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const studentId = localStorage.getItem("studentId")
            const response = await axios.get(`/getstudent/${studentId}`); 
            setStudentData(response.data.Data);
          } catch (error) {
            console.error('Error fetching student profile data:', error);
          }
        };
    
        fetchData();
      }, []);
    
  return (
    <div>
    <Typography variant="h4" gutterBottom>
      Student Profile
    </Typography>
   
    
       
            <>
            <br />
              <Typography variant="body1"><strong>Name:</strong> {studentData?.userFullName}</Typography>
              <br />
              <Typography variant="body1"><strong>Age:</strong> {studentData?.age}</Typography>
              <br />
              <Typography variant="body1"><strong>Date of Birth:</strong> {studentData?.dob}</Typography>
              <br />
              <Typography variant="body1"><strong>Gender:</strong> {studentData?.gender}</Typography>
              <br />
              <Typography variant="body1"><strong>Address:</strong> {studentData?.address}</Typography>
              <br />
              <Typography variant="body1"><strong>Mobile Number:</strong> {studentData?.mobileNumber}</Typography>
              <br />
              <Typography variant="body1"><strong>Email:</strong> {studentData?.email}</Typography>
            </>
        
      
   
  
  </div>
  );
};

export default StudentProfile;