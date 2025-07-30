import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GeneratePost from "./components/GeneratePost";
import UploadData from "./components/UploadData";
import Preferences from "./components/Preferences";
import HistoryVersions from "./components/HistoryVersions";
import { Container, Box } from "@mui/material";

function App() {
    const [section, setSection] = useState("generate");

    let body;
    if (section === "generate") body = <GeneratePost />;
    else if (section === "upload") body = <UploadData />;
    else if (section === "preferences") body = <Preferences />;
    else if (section === "history") body = <HistoryVersions />;

    return (
        <>
            <Navbar active={section} onSelect={setSection} />
            <Container maxWidth="md">
                <Box mt={4}>{body}</Box>
            </Container>
        </>
    );
}

export default App;
