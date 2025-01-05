"use client";
import { Box, Button, ButtonGroup, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const TodoEdit = ({ id }: { id: Number }) => {
    const [title, setTitle] = useState<String>();
    const [content, setContent] = useState<String>();
    const [completed, setCompleted] = useState<Boolean>();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/todos/${id}`);
                const todo = await response.json();
                setTitle(todo.title);
                setContent(todo.content);
                setCompleted(todo.completed);
            } catch (error) {
                console.error("データの取得中にエラーが発生しました:", error);
            }
        };
        handleFetch();
    }, [id]);

    const handleSubmit = async () => {
        await fetch(`${BACKEND_URL}/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });
    };

    return (
        <Container>
            <Box gap={4} sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    defaultValue={title}
                    sx={{ width: "100%" }}
                />
                <TextField
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    multiline
                    defaultValue={content}
                    sx={{ width: "100%" }}
                />
                <ButtonGroup variant="outlined" aria-label="basic button group">
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                        href={`/todos/${id}`}
                        variant="contained">
                        更新
                    </Button>
                    <Button href={`/todos/${id}`}>キャンセル</Button>
                </ButtonGroup>
            </Box>
        </Container>
    );
};

export default TodoEdit;
