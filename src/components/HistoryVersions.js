import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";

export default function HistoryVersions() {
    const [postId, setPostId] = useState("");
    const [history, setHistory] = useState([]);
    const [status, setStatus] = useState("");

    const fetchHistory = async () => {
        setStatus("Loading...");
        try {
            const res = await axios.get(
                `https://blog-writer.azurewebsites.net/history/${postId}`
            );
            setHistory(res.data || []);
            setStatus("");
        } catch (err) {
            setStatus("Error: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                History / Versions
            </Typography>
            <TextField
                label="Post ID"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={fetchHistory} sx={{ mb: 2 }}>
                Fetch History
            </Button>
            {status && <Box mt={2}>{status}</Box>}
            {history.length > 0 &&
                history.map((v, i) => (
                    <Box key={v.id || i} mt={2} p={2} border={1} borderRadius={2}>
                        <Typography variant="subtitle1">Version: {v.version}</Typography>
                        <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                            {v.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {v.created_at}
                        </Typography>
                    </Box>
                ))}
        </Paper>
    );
}
