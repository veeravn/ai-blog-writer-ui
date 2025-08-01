import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Divider } from "@mui/material";
import { comparePosts } from "../api";

// Props: open, onClose, version1, version2
export default function CompareModal({ open, onClose, version1, version2 }) {
    const [diff, setDiff] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && version1 && version2) {
            setLoading(true);
            comparePosts(version1.id, version1.version, version2.version)
                .then(({ data }) => setDiff(data.diff || "No difference"))
                .catch(e => setDiff("Error comparing versions"))
                .finally(() => setLoading(false));
        } else {
            setDiff("");
        }
    }, [open, version1, version2]);

    if (!version1 || !version2) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Compare Versions</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    Comparing <b>Version {version1.version}</b> and <b>Version {version2.version}</b>
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap", background: "#f8f8f8", p: 2, borderRadius: 1 }}>
                    {loading ? "Loading diff..." : diff}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}
