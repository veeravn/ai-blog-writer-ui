import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert } from "@mui/material";
import { revertPost } from "../api";

// Props: open, onClose, version
export default function RevertModal({ open, onClose, version }) {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRevert = () => {
        setLoading(true);
        revertPost(version.id, version.version)
            .then(() => setStatus("Post reverted to this version!"))
            .catch(e => setStatus("Failed to revert."))
            .finally(() => setLoading(false));
    };

    if (!version) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Revert to Version {version.version}?</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to revert to this version?</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    {version.content.slice(0, 120)}{version.content.length > 120 ? "..." : ""}
                </Typography>
                {status && <Alert severity={status.includes("revert") ? "success" : "error"}>{status}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button onClick={handleRevert} color="error" disabled={loading}>
                    {loading ? "Reverting..." : "Revert"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
