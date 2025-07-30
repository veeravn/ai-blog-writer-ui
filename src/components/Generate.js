// src/components/Generate.js
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Alert, Box, Typography } from "@mui/material";
import { generateBlogPost } from "../api";

export default function Generate() {
    const [prompt, setPrompt] = useState("");
    const [styleDescription, setStyleDescription] = useState("");
    const [styleReferencePostId, setStyleReferencePostId] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        setLoading(true); setOutput(""); setError("");
        try {
            const { data } = await generateBlogPost({
                prompt, style_description: styleDescription, style_reference_post_id: styleReferencePostId
            });
            setOutput(data.content || JSON.stringify(data));
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Box>
                <Typography variant="h5">Generate Blog Post</Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <TextField fullWidth label="Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} />
                </Box>
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <TextField fullWidth label="Style Description (optional)" value={styleDescription} onChange={e => setStyleDescription(e.target.value)} />
                    <TextField fullWidth label="Style Reference Post ID (optional)" value={styleReferencePostId} onChange={e => setStyleReferencePostId(e.target.value)} />
                </Box>
                <Button variant="contained" onClick={handleGenerate} sx={{ mt: 2 }} disabled={loading || !prompt}>
                    {loading ? <CircularProgress size={24} /> : "Generate"}
                </Button>
                {output && <Alert sx={{ mt: 2 }} severity="success"><pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre></Alert>}
                {error && <Alert sx={{ mt: 2 }} severity="error">{error}</Alert>}
            </Box>
        </Paper >
    );
}
