"use client";

import { loginAction } from "@/actions/auth";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const initialState = { success: false, error: "", redirectTo: "" };

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);

    return (
        <form action={formAction} className="space-y-5">
            <div>
                <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                    E-MAIL
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" />
                    <input
                        type="email"
                        name="email"
                        placeholder="admin@wasushi.com"
                        required
                        className="w-full rounded-lg bg-surface-highest/60 py-3 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        SENHA
                    </label>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        required
                        className="w-full rounded-lg bg-surface-highest/60 py-3 pl-10 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface-variant"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {state?.error && (
                <p className="text-sm text-brand-container">{state.error}</p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-gradient-to-r from-brand-container to-brand-primary py-3 text-sm font-bold tracking-wider text-brand-on-container transition-opacity hover:opacity-90 disabled:opacity-50"
            >
                {isPending ? "ENTRANDO..." : "ENTRAR"}
            </button>
        </form>
    );
}