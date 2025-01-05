"use client";

import { useAuth } from "@/app/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
    const router = useRouter();
    const schema = z.object({
        email: z
            .string()
            .email({ message: "有効なメールアドレスを入力してください。" }),
        password: z
            .string()
            .min(5, { message: "パスワードは5文字以上である必要があります。" }),
    });

    type LoginFormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
    });

    const { login } = useAuth();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: "POST",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const { token, userId } = await response.json();

            if (response && token && userId !== undefined) {
                login(token, userId);
                alert("ログインに成功しました！");
                router.push("/todos");
                router.refresh();
            } else {
                alert("ログインに失敗しました");
            }
        } catch (error) {
            console.error("ログインに失敗しました:", error);
            throw new Error("ログインに失敗しました");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField label="Email" {...register("email")} />
                {errors.email && (
                    <Typography variant="body1" sx={{ color: "red" }}>
                        {errors.email.message}
                    </Typography>
                )}
                <TextField label="Password" {...register("password")} />
                {errors.password && (
                    <Typography variant="body1" sx={{ color: "red" }}>
                        {errors.password.message}
                    </Typography>
                )}
                <Button type="submit" variant="contained">
                    ログイン
                </Button>
            </Stack>
        </form>
    );
};

export default Login;
