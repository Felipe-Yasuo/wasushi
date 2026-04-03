"use client";

import { registerAction } from "@/actions/auth";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const initialState = { success: false, error: "", redirectTo: "" };

export function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerAction, initialState);
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
                <label htmlFor="register-name" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                    NOME COMPLETO
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" aria-hidden="true" />
                    <input
                        id="register-name"
                        type="text"
                        name="name"
                        placeholder="Ex: Takeshi Sato"
                        required
                        className="w-full rounded-lg bg-surface-highest/60 py-3 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="register-email" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                    EMAIL PROFISSIONAL
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" aria-hidden="true" />
                    <input
                        id="register-email"
                        type="email"
                        name="email"
                        placeholder="nome@wasushi.com"
                        required
                        className="w-full rounded-lg bg-surface-highest/60 py-3 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="register-password" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                    SENHA
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" aria-hidden="true" />
                    <input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        required
                        className="w-full rounded-lg bg-surface-highest/60 py-3 pl-10 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface-variant"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
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
                {isPending ? "CRIANDO..." : "CRIAR CONTA"}
            </button>
        </form>
    );
}