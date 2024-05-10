import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import axios from "../../../utils/axiosInstance"

const TeacherProfile = () => {
    const [teacherData, setTeacherData] = useState(null);

    console.log("goo",teacherData)

    useEffect(() => {
        const fetchData = async () => {
          try {

           const teacherId = localStorage.getItem("teacherId")
           console.log("first")
            const response = await axios.get(`/teacherdata/${teacherId}`); 
            setTeacherData(response.data.data);
            console.log("hgfjh",response)
          } catch (error) {
            console.error('Error fetching teacher profile data:', error);
          }
        };
    
        fetchData();
      }, []);
    
  return (
    <div>
    <Typography variant="h4" gutterBottom>
      Teacher Profile
    </Typography>
   
    
       
            <>
            <br />
              <Typography variant="body1"><strong>Name:</strong> {teacherData?.userFullName}</Typography>
              <br />
              <Typography variant="body1"><strong>Age:</strong> {teacherData?.age}</Typography>
              <br />
              <Typography variant="body1"><strong>Date of Birth:</strong> {teacherData?.dob}</Typography>
              <br />
              <Typography variant="body1"><strong>Gender:</strong> {teacherData?.gender}</Typography>
              <br />
              <Typography variant="body1"><strong>Address:</strong> {teacherData?.address}</Typography>
              <br />
              <Typography variant="body1"><strong>Mobile Number:</strong> {teacherData?.mobileNumber}</Typography>
              <br />
              <Typography variant="body1"><strong>Email:</strong> {teacherData?.email}</Typography>
            </>
        
      
   
  
  </div>
  );
};

export default TeacherProfile;