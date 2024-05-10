import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
    // Add main container styles here if needed
}));

const MainTitle = styled(Box)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));

const SubContainer = styled(Box)(({ theme }) => ({
    // Add sub container styles here if needed
}));

export default function StudentExamTimetable() {
    const [data, setData] = useState([]);

    const fetchTimtable = async () => {
        try {
            const studentId = localStorage.getItem("studentId");
            const response = await axios.get(`/gettimetabeletostudent/${studentId}`);
            setData(response.data.Data);
        } catch (error) {
            console.error("Error getting Time Table:", error);
        }
    };

    useEffect(() => {
        fetchTimtable();
    }, []);

    console.log(data);

    return (
        <MainContainer>
            <MainTitle>Time Table</MainTitle>
            <SubContainer>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time Slot</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Mathematics</TableCell>
                                <TableCell>Monday, May 10</TableCell>
                                <TableCell>10:00 AM - 11:30 AM</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Science</TableCell>
                                <TableCell>Tuesday, May 11</TableCell>
                                <TableCell>9:00 AM - 10:30 AM</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>History</TableCell>
                                <TableCell>Wednesday, May 12</TableCell>
                                <TableCell>1:00 PM - 2:30 PM</TableCell>
                            </TableRow>
                            {/* Add more rows as needed */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SubContainer>
        </MainContainer>
    );
}
