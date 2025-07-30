import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { revertPost } from "../api";
import { Paper } from "@mui/material";

export default function RevertModal({ open, onClose, post }) {
    const [version, setVersion] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRevert = async () => {
        setLoading(true);
        try {
            const { data } = await revertPost(post.id, version);
            setMsg("Revert successful: " + JSON.stringify(data));
        } catch (e) {
            setMsg("Error: " + (e.response?.data?.error || e.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Revert to Version</DialogTitle>
                <DialogContent>
                    <TextField label="Version Number" value={version} onChange={e => setVersion(e.target.value)} />
                    <Button onClick={handleRevert} disabled={loading} sx={{ ml: 2 }}>Revert</Button>
                    {msg && <pre style={{ background: "#eee", padding: 10 }}>{msg}</pre>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
