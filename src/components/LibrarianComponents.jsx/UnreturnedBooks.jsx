import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const UnreturnedBooks = () => {
    const [transactions, setTransactions] = useState([]);

    console.log('first',transactions)

   
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/getnotdispachedtransactions');
                setTransactions(response.data.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching unapproved transactions:', error);
            }
        };
        useEffect(() => {
        fetchTransactions();
    }, []);

    const dispatchBook = async (bookId) => {
        try {
            await axios.post(`/dispachbook/${bookId}`);
            fetchTransactions();

        } catch (error) {
            console.error('Error approving transaction:', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography  gutterBottom>
               students who have not returned their books !
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Fine Amount</TableCell>
                            <TableCell>Payment Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell>{transaction?.studentid?.userFullName}</TableCell>
                                <TableCell>{transaction?.bookid?.title}</TableCell>
                                <TableCell>{transaction.startDate.slice(0, 10)}</TableCell>
                                <TableCell>{transaction.endDate.slice(0, 10)}</TableCell>
                             
                                <TableCell>{transaction?.fine}</TableCell>
                                <TableCell>{transaction?.isPayed ? "Paid" : "Not Paid"}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => dispatchBook(transaction?._id)}>
                                        Dispatch
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UnreturnedBooks;
