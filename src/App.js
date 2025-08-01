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
// App title/logo section
const AppTitle = () => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            py: 3,
            flexDirection: "column"
        }}
    >
        <img
            src="/ai-blog-writer-logo.png"
            alt="AI Blog Writer Logo"
            style={{ height: 200, marginBottom: 12 }}
        />
    </Box>
);
export { AppTitle };
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
                <AppTitle />
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
