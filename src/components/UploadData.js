import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import axios from "axios";

export default function UploadData() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const handleUpload = async () => {
        if (!file) return;
        setStatus("Uploading...");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(
                "https://blog-writer.azurewebsites.net/upload",
                formData
            );
            setStatus(res.data.status || "Uploaded successfully");
        } catch (err) {
            setStatus("Error: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Upload Data
            </Typography>
            <input
                type="file"
                accept=".txt,.json,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginBottom: 10 }}
            />
            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file}
                sx={{ ml: 2 }}
            >
                Upload
            </Button>
            {status && <Box mt={2}>{status}</Box>}
        </Paper>
    );
}
