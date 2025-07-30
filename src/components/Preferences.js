// src/components/Preferences.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, CircularProgress, Alert, Typography } from "@mui/material";
import { getPreferences, savePreferences } from "../api";
import { Paper } from "@mui/material";

const USER_ID = "user123"; // Replace as needed

export default function Preferences() {
    const [tone, setTone] = useState("");
    const [structure, setStructure] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setLoading(true);
        getPreferences(USER_ID)
            .then(({ data }) => {
                setTone(data.tone || "");
                setStructure(data.structure || "");
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setLoading(true); setMsg("");
        try {
            await savePreferences(USER_ID, { tone, structure });
            setMsg("Preferences saved!");
        } catch (e) {
            setMsg("Save failed: " + (e.response?.data?.error || e.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3, background: "#fff", boxShadow: 2 }}>
            <Box>
                <Typography variant="h5">Preferences</Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <TextField label="Tone" value={tone} onChange={e => setTone(e.target.value)} fullWidth />
                    <TextField label="Structure" value={structure} onChange={e => setStructure(e.target.value)} fullWidth />
                </Box>
                <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Save"}
                </Button>
                {msg && <Alert sx={{ mt: 2 }} severity={msg.startsWith("Preferences saved") ? "success" : "error"}>{msg}</Alert>}
            </Box>
        </Paper>
    );
}
