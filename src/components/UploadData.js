// src/components/UploadData.js
import React, { useState } from "react";
import { Button, Box, CircularProgress, Alert, Typography } from "@mui/material";
import { uploadData } from "../api";

export default function UploadData() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true); setMsg("");
        const formData = new FormData();
        formData.append("file", file);
        try {
            await uploadData(formData);
            setMsg("Upload successful!");
        } catch (err) {
            setMsg("Upload failed: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Box>
                <Typography variant="h5">Upload Data</Typography>
                <Box sx={{ mt: 2 }}>
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                </Box>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpload} disabled={!file || loading}>
                    {loading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
                {msg && <Alert sx={{ mt: 2 }} severity={msg.startsWith("Upload successful") ? "success" : "error"}>{msg}</Alert>}
            </Box>
        </Paper>
    );
}
