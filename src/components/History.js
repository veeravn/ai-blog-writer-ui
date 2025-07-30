import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Alert, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from "@mui/material";
import { getHistory, comparePosts, revertPost } from "../api";
import CompareModal from "./CompareModal";
import RevertModal from "./RevertModal";

const USER_ID = "user123"; // Replace with actual user

export default function History() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [compareOpen, setCompareOpen] = useState(false);
    const [revertOpen, setRevertOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        setLoading(true);
        getHistory(USER_ID)
            .then(({ data }) => setPosts(data.posts || []))
            .catch(e => setError(e.response?.data?.error || e.message))
            .finally(() => setLoading(false));
    }, []);

    // Example handlers for Compare/Revert (showing modal)
    const handleCompare = (post) => { setSelectedPost(post); setCompareOpen(true); };
    const handleRevert = (post) => { setSelectedPost(post); setRevertOpen(true); };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Box>
                <Typography variant="h5">History / Versions</Typography>
                {loading && <CircularProgress sx={{ mt: 2 }} />}
                {error && <Alert sx={{ mt: 2 }} severity="error">{error}</Alert>}
                <List>
                    {posts.map(post => (
                        <ListItem key={post.id}>
                            <ListItemText
                                primary={`${post.prompt.slice(0, 50)}...`}
                                secondary={`Version: ${post.version} | ID: ${post.id}`}
                            />
                            <Button onClick={() => handleCompare(post)} sx={{ mr: 1 }}>Compare</Button>
                            <Button onClick={() => handleRevert(post)} color="error">Revert</Button>
                        </ListItem>
                    ))}
                </List>
                {/* Compare & Revert Modals */}
                <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} post={selectedPost} />
                <RevertModal open={revertOpen} onClose={() => setRevertOpen(false)} post={selectedPost} />
            </Box>
        </Paper>
    );
}
