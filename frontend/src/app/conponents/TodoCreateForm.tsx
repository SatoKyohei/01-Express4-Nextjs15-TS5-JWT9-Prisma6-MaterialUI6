import { Box, Button, ButtonGroup, Container, TextField } from "@mui/material";
import React, { useId, useState } from "react";

const TodoCreateForm = () => {
    const [title, setTitle] = useState<String>();
    const [content, setContent] = useState<String>();
    const [userId, setUserId] = useState<Number>(14); // 課題：ダミーデータ

    const handleSubmit = async () => {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

        await fetch(`${BACKEND_URL}/todos/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, userId }),
        });
    };

    return (
        <Container>
            <Box gap={4} sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    required
                    label="Title"
                    sx={{ width: "100%" }}
                />
                <TextField
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    multiline
                    label="Content"
                    sx={{ width: "100%" }}
                />
                <ButtonGroup variant="outlined" aria-label="basic button group">
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                        href="/todos"
                        variant="contained">
                        作成
                    </Button>
                    <Button href="/todos">キャンセル</Button>
                </ButtonGroup>
            </Box>
        </Container>
    );
};

export default TodoCreateForm;
