import { TodoInfo } from "@/app/types/types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const TodoCard = ({ props }: { props: TodoInfo }) => {
    const { id, title, content, published } = props;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link href={`/todos/${id}`}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://picsum.photos/800"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}>
                        {content}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default TodoCard;
