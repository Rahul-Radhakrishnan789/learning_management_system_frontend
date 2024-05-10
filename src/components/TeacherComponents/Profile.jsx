import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import axios from "../../../utils/axiosInstance"
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

const TeacherProfile = () => {
    const [teacherData, setTeacherData] = useState(null);

    console.log("goo", teacherData)

    useEffect(() => {
        const fetchData = async () => {
            try {

                const teacherId = localStorage.getItem("teacherId")
                console.log("first")
                const response = await axios.get(`/teacherdata/${teacherId}`);
                setTeacherData(response.data.data);
                console.log("hgfjh", response)
            } catch (error) {
                console.error('Error fetching teacher profile data:', error);
            }
        };

        fetchData();
    }, []);

    return (
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
                                        <MDBCardText className="text-muted">{teacherData?.userFullName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{teacherData?.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {teacherData?.mobileNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Age</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{teacherData?.age}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{teacherData?.address}</MDBCardText>
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

export default TeacherProfile;