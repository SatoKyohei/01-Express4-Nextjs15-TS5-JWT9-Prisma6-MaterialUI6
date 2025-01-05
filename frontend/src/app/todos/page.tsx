"use client";
import TodoCard from "@/app/conponents/TodoCard";
import { TodoInfo } from "@/app/types/types";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const Todos = () => {
    const [todos, setTodos] = useState<TodoInfo[]>([]);

    const fetchAllTodos = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`,
            {
                cache: "no-store",
            }
        );
        const data = await res.json();
        setTodos(data.todos);
    };

    useEffect(() => {
        fetchAllTodos();
    }, []);

    return (
        <div>
            <Box gap={3} sx={{ display: "flex", alignItems: "center" }}>
                {todos.map((todo) => (
                    <TodoCard key={todo.id} props={todo} />
                ))}
            </Box>
        </div>
    );
};

export default Todos;
