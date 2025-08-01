import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Alert, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from "@mui/material";
import { getHistory } from "../api";
import CompareModal from "./CompareModal";
import RevertModal from "./RevertModal";
import { Paper } from "@mui/material";

const USER_ID = "user123"; // Replace with actual user

export default function History() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); // Selected post object
    const [versions, setVersions] = useState([]); // Versions for selected post
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [compareOpen, setCompareOpen] = useState(false);
    const [revertOpen, setRevertOpen] = useState(false);
    const [version1, setVersion1] = useState(null);
    const [version2, setVersion2] = useState(null);

    useEffect(() => {
        setLoading(true);
        getHistory(USER_ID)
            .then(({ data }) => setPosts(Array.isArray(data.posts) ? data.posts : []))
            .catch(e => setError(e.response?.data?.error || e.message))
            .finally(() => setLoading(false));
    }, []);

    // Fetch version history when a post is selected
    const handlePostClick = (post) => {
        setSelectedPost(post);
        setLoading(true);
        fetchPostVersions(USER_ID, post.id)
            .then(versions => setVersions(versions))
            .catch(e => setError(e.response?.data?.error || e.message))
            .finally(() => setLoading(false));
    };

    // Example handlers for Compare/Revert (showing modal)
    const handleCompare = (v1, v2) => { setVersion1(v1); setVersion2(v2); setCompareOpen(true); };
    const handleRevert = (version) => { setVersion1(version); setRevertOpen(true); };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Typography variant="h5">Blog History / Versions</Typography>
            {error && <Alert sx={{ mt: 2 }} severity="error">{error}</Alert>}

            {/* Sidebar/List */}
            {!selectedPost ? (
                <Box>
                    <Typography sx={{ mb: 2 }}>Your Posts:</Typography>
                    {loading && <CircularProgress />}
                    <List>
                        {(Array.isArray(posts) ? posts : []).map(post => (
                            <ListItem button key={post.id} onClick={() => handlePostClick(post)}>
                                <ListItemText
                                    primary={post.title || post.prompt.slice(0, 40)}
                                    secondary={`Created: ${post.created_at?.slice(0, 19).replace('T', ' ')}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ) : (
                <Box>
                    <Button onClick={() => { setSelectedPost(null); setVersions([]); }} sx={{ mb: 2 }}>← Back to all posts</Button>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {selectedPost.title || selectedPost.prompt.slice(0, 40)}
                    </Typography>
                    <List>
                        {versions.map((v, idx) => (
                            <ListItem key={v.id} alignItems="flex-start" sx={{ flexDirection: "column", alignItems: "stretch" }}>
                                <ListItemText
                                    primary={`Version ${v.version} — ${v.created_at?.slice(0, 19).replace('T', ' ')}`}
                                    secondary={<pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{v.content}</pre>}
                                />
                                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                    {idx > 0 &&
                                        <Button
                                            size="small"
                                            onClick={() => handleCompare(versions[idx - 1], v)}
                                        >Compare to Prev</Button>
                                    }
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleRevert(v)}
                                    >Revert</Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                    {/* Modals */}
                    <CompareModal
                        open={compareOpen}
                        onClose={() => setCompareOpen(false)}
                        version1={version1}
                        version2={version2}
                    />
                    <RevertModal
                        open={revertOpen}
                        onClose={() => setRevertOpen(false)}
                        version={version1}
                    />
                </Box>
            )}
        </Paper>
    );
}
