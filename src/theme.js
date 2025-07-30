// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: "#1976d2" },     // Deep blue
        secondary: { main: "#ff9800" },   // Orange
        background: { default: "#f8f9fa" }
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: { fontWeight: 700, marginBottom: 16 },
        h5: { fontWeight: 600, marginBottom: 8 },
    },
});

export default theme;
