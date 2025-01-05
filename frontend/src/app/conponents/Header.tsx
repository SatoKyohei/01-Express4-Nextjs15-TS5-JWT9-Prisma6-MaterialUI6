"use client";
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const { isAuthenticated, login, logout } = useAuth();
    return (
        <Box sx={{ flexGrow: 1, mb: 3 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        Top
                    </Typography>
                    <Button href="/todos/create" color="inherit">
                        Create Todo
                    </Button>
                    {isAuthenticated ? (
                        <Tooltip title={`プロフィール`}>
                            <Link href="/profile">
                                <Image
                                    src="/profile.png"
                                    alt="profile"
                                    width={60}
                                    height={60}
                                />
                            </Link>
                        </Tooltip>
                    ) : (
                        <Button color="inherit">Sign Up</Button>
                    )}

                    {isAuthenticated ? (
                        <Button href="/" color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <Button href="/login" color="inherit">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
