import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const RentalDeadline = () => {
    const [transactions, setTransactions] = useState([]);

    console.log('first',transactions)

  
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/getalltransactionwithduedate');
                setTransactions(response.data);
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching unapproved transactions:', error);
            }
        };

        useEffect(() => {
        fetchTransactions();
    }, []);


    const sendEmail = async (userId) => {
        const response = axios.post(`/sendemailtostudent/${userId}`)
        fetchTransactions();
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography gutterBottom>
               details of students who have their last date of returning book is today !
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions?.map((transaction) => (
                            <TableRow key={transaction?._id}>
                                <TableCell>{transaction?.studentid?.userFullName}</TableCell>
                                <TableCell>{transaction?.bookid?.title}</TableCell>
                                <TableCell>{transaction.startDate?.slice(0, 10)}</TableCell>
                                <TableCell>{transaction?.endDate?.slice(0, 10)}</TableCell>
                                <TableCell> 
                                    {transaction?.isEmailSent ? (
                                         <Button variant="contained" color="success">   
                                         mail sent
                                     </Button>
                                    ) : (
                                        <Button variant="contained" color="secondary" onClick={() => sendEmail(transaction._id)}>
                                        send Email
                                    </Button>
                                    )}
                               
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RentalDeadline;


