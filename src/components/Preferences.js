import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function Preferences() {
    const [preferences, setPreferences] = useState({ tone: "", structure: "" });
    const [status, setStatus] = useState("");

    useEffect(() => {
        // Replace with actual user ID if needed
        axios
            .get("https://blog-writer.azurewebsites.net/preferences/testuser")
            .then((res) => setPreferences(res.data))
            .catch(() => { });
    }, []);

    const savePrefs = async () => {
        try {
            await axios.post(
                "https://blog-writer.azurewebsites.net/preferences/testuser",
                preferences
            );
            setStatus("Saved!");
        } catch (err) {
            setStatus("Error: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Preferences
            </Typography>
            <TextField
                label="Preferred Tone"
                value={preferences.tone}
                onChange={(e) => setPreferences({ ...preferences, tone: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Preferred Structure"
                value={preferences.structure}
                onChange={(e) => setPreferences({ ...preferences, structure: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={savePrefs}>
                Save Preferences
            </Button>
            {status && <Box mt={2}>{status}</Box>}
        </Paper>
    );
}
