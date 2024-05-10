import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import axios from "../../../utils/axiosInstance";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

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
//     <div>
//     <Typography variant="h4" gutterBottom>
//       Student Profile
//     </Typography>
   
    
       
//             <>
//             <br />
//               <Typography variant="body1"><strong>Name:</strong> {studentData?.userFullName}</Typography>
//               <br />
//               <Typography variant="body1"><strong>Age:</strong> {studentData?.age}</Typography>
//               <br />
//               <Typography variant="body1"><strong>Date of Birth:</strong> {studentData?.dob}</Typography>
//               <br />
//               <Typography variant="body1"><strong>Gender:</strong> {studentData?.gender}</Typography>
//               <br />
//               <Typography variant="body1"><strong>Address:</strong> {studentData?.address}</Typography>
//               <br />
//               <Typography variant="body1"><strong>Mobile Number:</strong> {studentData?.mobileNumber}</Typography>
//               <br />
//               <Typography variant="body1"><strong>Email:</strong> {studentData?.email}</Typography>
//             </>
        
      
   
  
//   </div>

<section style={{ backgroundColor: '#eee' }}>
<MDBContainer className="py-5">
  

    <MDBRow>
        <MDBCol lg="4">
            <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                    <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                    <div className="d-flex justify-content-center mb-2">

                    </div>
                </MDBCardBody>
            </MDBCard>


        </MDBCol>
        <MDBCol lg="8">
            <MDBCard className="mb-4">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{studentData?.userFullName}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{studentData?.email}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted"> {studentData?.mobileNumber}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Age</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{studentData?.age}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{studentData?.address}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

            <MDBRow>


                <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">

                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBCol>
    </MDBRow>
</MDBContainer>
</section>
  );
};

export default StudentProfile;