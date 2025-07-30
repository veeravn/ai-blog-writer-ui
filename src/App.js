// src/App.js
import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import Generate from "./components/Generate";
import UploadData from "./components/UploadData";
import Preferences from "./components/Preferences";
import History from "./components/History";

const tabLabels = ["Generate", "Upload Data", "Preferences", "History/Versions"];

export default function App() {
    const [tab, setTab] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ background: theme.palette.primary.main, minHeight: "100vh" }}>
                <AppBar position="static" color="primary">
                    <Tabs value={tab} onChange={(_, v) => setTab(v)} centered textColor="inherit" indicatorColor="secondary">
                        {tabLabels.map((label, idx) => (
                            <Tab key={label} label={label} sx={{ fontWeight: 600 }} />
                        ))}
                    </Tabs>
                </AppBar>
                {/* Title Section */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Typography variant="h4" color="primary.contrastText" sx={{
                        background: "#fff",
                        px: 4, py: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        minWidth: "340px",
                        textAlign: "center"
                    }}>
                        AI Blog Writer
                    </Typography>
                </Box>
                {/* Main Body */}
                <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 900, mx: "auto", mt: 4 }}>
                    {tab === 0 && <Generate />}
                    {tab === 1 && <UploadData />}
                    {tab === 2 && <Preferences />}
                    {tab === 3 && <History />}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
