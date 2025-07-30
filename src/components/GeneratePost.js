import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";

export default function GeneratePost() {
    const [prompt, setPrompt] = useState("");
    const [styleDesc, setStyleDesc] = useState("");
    const [styleRef, setStyleRef] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setResponse("");
        try {
            const res = await axios.post(
                "https://blog-writer.azurewebsites.net/blog-post",
                {
                    prompt,
                    style_description: styleDesc,
                    style_reference_post_id: styleRef,
                    // Add user_id, preferences, etc as needed
                }
            );
            setResponse(res.data.content || JSON.stringify(res.data));
        } catch (err) {
            setResponse("Error: " + (err.response?.data?.error || err.message));
        }
        setLoading(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Generate Blog Post
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Prompt"
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Style Description (optional)"
                        fullWidth
                        value={styleDesc}
                        onChange={(e) => setStyleDesc(e.target.value)}
                        placeholder="e.g. Confident, witty, technical"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Style Reference Post ID (optional)"
                        fullWidth
                        value={styleRef}
                        onChange={(e) => setStyleRef(e.target.value)}
                        placeholder="UUID of previous post"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate"}
                    </Button>
                </Grid>
            </Grid>
            {response && (
                <Box mt={3}>
                    <Typography variant="subtitle1">Result:</Typography>
                    <Paper elevation={1} sx={{ p: 2, whiteSpace: "pre-wrap" }}>
                        {response}
                    </Paper>
                </Box>
            )}
        </Paper>
    );
}