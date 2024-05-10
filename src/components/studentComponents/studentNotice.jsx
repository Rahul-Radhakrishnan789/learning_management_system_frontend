import React, { useState } from "react";

import { Box, Card, Grid, Typography, styled } from "@mui/material";
const MainContainer = styled(Box)(({ theme }) => ({}));
const MainTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));
const SubContainer = styled(Box)(({ theme }) => ({}));

const GridContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
}));
const GridItem = styled(Grid)(({ theme }) => ({}));
const LeaveCard = styled(Card)(({ theme }) => ({
    width: "100%",
    minHeight: "25rem",
    marginTop: "2rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: 700,
}));
const CardDec = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    lineHeight: "2rem",
}));

export default function StudentNotice() {
    const [notices, setNotices] = useState([]);

    return (
        <MainContainer>
            <MainTitle>
                <MainTitle>Leave Reports</MainTitle>
            </MainTitle>
            <SubContainer>
                <GridContainer container spacing={2}>
                    <GridItem item xs={12} md={6}>
                        <LeaveCard>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <CardTitle>Title</CardTitle>
                                <Typography sx={{ fontSize: "15px" }}>01/02/2002</Typography>
                            </Box>
                            <CardDec>'sss'</CardDec>
                        </LeaveCard>
                    </GridItem>
                    
                    <GridItem item xs={12} md={6}>
                        <LeaveCard>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <CardTitle>Title</CardTitle>
                                <Typography sx={{ fontSize: "15px" }}>01/02/2002</Typography>
                            </Box>
                            <CardDec>'sss'</CardDec>
                        </LeaveCard>
                    </GridItem>
                </GridContainer>
            </SubContainer>
        </MainContainer>
    );
}
