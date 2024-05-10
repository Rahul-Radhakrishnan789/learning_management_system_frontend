import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const DailyReport = () => {
  const [date, setDate] = useState('');
  const [report, setReport] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setDate(value);
    } else if (name === 'report') {
      setReport(value);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/add-daily-report', { date, report });
      console.log('Daily report added successfully');
      setDate('');
      setReport('');
    } catch (error) {
      console.error('Error adding daily report:', error);
    }
  };

  return (
    <Container sx={{width:"100vh"}}>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Add Daily Report
        </Typography>
        <Box width="100%">
          <Box mb={2}>
            <TextField
              id="date"
              name="date"
              label="Date"
              type="date"
              variant="outlined"
              value={date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <TextField
            id="report"
            name="report"
            label="Report"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            margin="normal"
            value={report}
            onChange={handleChange}
          />
        </Box>
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Send Report
        </Button>
      </Box>
    </Container>
  );
};

export default DailyReport;

