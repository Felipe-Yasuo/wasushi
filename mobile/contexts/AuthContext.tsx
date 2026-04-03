import api, { setSignOutCallback } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginResponse, User } from "../types/index";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextData {
    user: User | null;
    signed: boolean;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            await loadStorageData();
        }

        loadData();
        setSignOutCallback(signOut);

        return () => {
            cancelled = true;
            setSignOutCallback(null);
        };
    }, []);

    async function loadStorageData() {
        try {
            setLoading(true);
            const storedToken = await AsyncStorage.getItem("@token:wasushi");
            const storedUser = await AsyncStorage.getItem("@user:wasushi");

            if (storedToken && storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email: string, password: string) {
        const response = await api.post<LoginResponse>("/session", {
            email: email,
            password: password,
        });

        const { token, ...userData } = response.data;

        await AsyncStorage.setItem("@token:wasushi", token);
        await AsyncStorage.setItem("@user:wasushi", JSON.stringify(userData));

        setUser(userData);
    }

    async function signOut() {
        await AsyncStorage.removeItem("@token:wasushi");
        await AsyncStorage.removeItem("@user:wasushi");
        setUser(null);
    }

    return (
        <AuthContext
            value={{
                signed: !!user,
                loading,
                signIn,
                user,
                signOut,
            }}
        >
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}