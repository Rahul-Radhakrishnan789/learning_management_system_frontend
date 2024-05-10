import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

import { Box, Button, Card, Grid, Typography, styled } from "@mui/material";
const MainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
}));
const MainTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));
const SubContainer = styled(Box)(({ theme }) => ({}));
const GridContainer = styled(Grid)(({ theme }) => ({}));
const GridItem = styled(Grid)(({ theme }) => ({}));

const AssignmentCard = styled(Card)(({ theme }) => ({
    width: "100%",
    height: "300px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

const AssignmentTitle = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    fontWeight: 600,
}));
const AssignmentDesc = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
}));

const AssingmentDates = styled(Box)(({ theme }) => ({}));
const Dates = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    fontWeight: 600,
}));

// const Container = styled(Box)(({theme})=>({}))
// const MainContainer = styled(Box)(({theme})=>({}))
// const MainContainer = styled(Box)(({theme})=>({}))

export default function StudentAssignment() {
    const [assignments, setAssignments] = useState([]);

    const fetchAssignments = async () => {
        try {
            const studentId = localStorage.getItem("studentId");
            const response = await axios.get(`/getassignmenttostudent/${studentId}`);
            setAssignments(response.data.Data);
        } catch (error) {
            console.error("Error creating assignment:", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    console.log(assignments);
    return (
        <MainContainer>
            <MainTitle>Assignments</MainTitle>
            <SubContainer>
                <GridContainer container spacing={2}>
                    {assignments.map((assignment) => (
                        <GridItem item xs={12} sm={6} md={4} lg={3}>
                            <AssignmentCard>
                                <AssignmentTitle>{assignment.title}</AssignmentTitle>
                                <AssignmentDesc>
                                    {assignment.description}
                                </AssignmentDesc>
                                <AssingmentDates>
                                    <Dates>
                                        Start : <span>{assignment.startDate}</span>
                                    </Dates>
                                    <Dates>
                                        End : <span>{assignment.deadLine}</span>
                                    </Dates>
                                </AssingmentDates>
                                <button
                                    style={{
                                        padding: "2px",
                                        fontSize: "15px",
                                        background: "transparent",
                                        border: "1px solid grey",
                                        cursor: "pointer",
                                    }}
                                >
                                    subbmit
                                </button>
                            </AssignmentCard>
                        </GridItem>
                    ))}
                </GridContainer>
            </SubContainer>
        </MainContainer>
    );
}
