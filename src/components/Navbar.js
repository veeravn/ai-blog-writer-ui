import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";

export default function Navbar({ active, onSelect }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Tabs
                    value={active}
                    onChange={(_, v) => onSelect(v)}
                    textColor="inherit"
                    indicatorColor="secondary"
                >
                    <Tab label="Generate" value="generate" />
                    <Tab label="Upload Data" value="upload" />
                    <Tab label="Preferences" value="preferences" />
                    <Tab label="History/Versions" value="history" />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}
