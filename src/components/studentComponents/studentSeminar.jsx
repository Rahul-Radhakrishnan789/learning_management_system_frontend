import React from "react";

import { Box, Card, Grid, Modal, Typography, styled } from "@mui/material";

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
const SeminarCard = styled(Card)(({ theme }) => ({
    width: "100%",
    minHeight: "25rem",
    marginTop: "2rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
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
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    display:'flex',
    flexDirection:'column',



};

export default function StudentSeminar() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <MainContainer>
            <MainTitle>
                <MainTitle>Seminars</MainTitle>
            </MainTitle>
            <SubContainer>
                <GridContainer container spacing={2}>
                    <GridItem item xs={12} md={6}>
                        <SeminarCard>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <CardTitle>Title</CardTitle>
                                    <Typography sx={{ fontSize: "15px" }}>01/02/2002</Typography>
                                </Box>
                                <CardDec>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam qui maxime dolor.
                                    Reprehenderit vero asperiores minima doloremque nostrum, consectetur quod commodi
                                    quaerat, consequatur quas quibusdam culpa omnis sed dolorum cumque quia repudiandae,
                                    eius in soluta impedit. Deleniti eum nisi ullam fugiat delectus reprehenderit quia
                                    tempore labore quae, possimus asperiores harum.
                                </CardDec>
                            </Box>
                            <button
                                onClick={handleOpen}
                                style={{
                                    alignSelf: "flex-end",
                                    background: "transparent",
                                    border: "1px solid grey",
                                    borderRadius: "5px",
                                    padding: "5px",
                                    fontSize: "14px",
                                }}
                            >
                                Attach
                            </button>
                        </SeminarCard>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add File
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Must Upload the full report.
                                </Typography>
                                <input 
                                  style={{marginTop:'16px'}}
                                type="file" />
                                <button
                                onClick={handleOpen}
                                style={{
                                    alignSelf: "flex-end",
                                    background: "transparent",
                                    border: "1px solid grey",
                                    borderRadius: "5px",
                                    padding: "5px",
                                    fontSize: "14px",
                                }}
                            >
                                Subbmit
                            </button>
                            </Box>
                        </Modal>
                    </GridItem>
                </GridContainer>
            </SubContainer>
        </MainContainer>
    );
}
