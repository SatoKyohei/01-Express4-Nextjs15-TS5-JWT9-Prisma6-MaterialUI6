"use client";
import { Box, Button, ButtonGroup, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const TodoDetail = ({ id }: { id: Number }) => {
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

    const handleDelete = async () => {
        await fetch(`${BACKEND_URL}/todos/${id}`, {
            method: "DELETE",
        });
    };

    return (
        <Container>
            <Box gap={4} sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    defaultValue={title}
                    sx={{ width: "100%" }}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
                <TextField
                    multiline
                    defaultValue={content}
                    sx={{ width: "100%" }}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
                <ButtonGroup variant="outlined" aria-label="basic button group">
                    <Button href={`/todos/${id}/edit`} variant="contained">
                        編集
                    </Button>
                    <Button
                        onClick={() => handleDelete()}
                        href={`/todos`}
                        variant="contained"
                        color="warning">
                        削除
                    </Button>
                    <Button href={`/todos`}>キャンセル</Button>
                </ButtonGroup>
            </Box>
        </Container>
    );
};

export default TodoDetail;
