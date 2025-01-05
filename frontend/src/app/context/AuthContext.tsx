"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const token = Cookies.get("authToken");
        setIsAuthenticated(!!token);
    }, []);

    const login = (token: string, userId: number) => {
        Cookies.set("authToken", token, { expires: 7 });
        Cookies.set("userId", userId.toString(), { expires: 7 });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response) {
                throw new Error("ログアウトに失敗しました");
            }

            Cookies.remove("authToken");
            Cookies.remove("userId");
            setIsAuthenticated(false);
            alert("ログアウトしました");
        } catch (error) {
            console.error("ログアウトエラー:", error);
            alert("ログアウト中にエラーが発生しました");
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
