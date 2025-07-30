import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { comparePosts } from "../api";

export default function CompareModal({ open, onClose, post }) {
    const [v1, setV1] = useState("");
    const [v2, setV2] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        setLoading(true);
        try {
            const { data } = await comparePosts(post.id, v1, v2);
            setResult(JSON.stringify(data, null, 2));
        } catch (e) {
            setResult("Error: " + (e.response?.data?.error || e.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Compare Versions</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField label="Version 1" value={v1} onChange={e => setV1(e.target.value)} />
                        <TextField label="Version 2" value={v2} onChange={e => setV2(e.target.value)} />
                        <Button onClick={handleCompare} disabled={loading}>Compare</Button>
                    </Box>
                    {result && <pre style={{ background: "#eee", padding: 10 }}>{result}</pre>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
