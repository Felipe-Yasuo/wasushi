"use client";

import { loginAction } from "@/actions/auth";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Zap } from "lucide-react";

const initialState = { success: false, error: "", redirectTo: "" };

const DEMO_EMAIL = "admin@example.com";
const DEMO_PASSWORD = "123456789";

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);

    function fillDemo() {
        setEmail(DEMO_EMAIL);
        setPassword(DEMO_PASSWORD);
    }

    return (
        <div className="space-y-5">
            <div className="rounded-lg border border-outline-variant/40 bg-surface-container/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-[0.12em] text-on-surface-variant">
                        CONTA DE DEMONSTRAÇÃO
                    </p>
                    <button
                        type="button"
                        onClick={fillDemo}
                        className="flex items-center gap-1.5 rounded-md bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary/20"
                    >
                        <Zap className="h-3 w-3" aria-hidden="true" />
                        Preencher
                    </button>
                </div>
                <div className="space-y-1 text-xs text-on-surface-variant/70">
                    <p>
                        <span className="text-on-surface-variant/50">Email</span>
                        {"  "}
                        <span className="font-mono text-on-surface">{DEMO_EMAIL}</span>
                    </p>
                    <p>
                        <span className="text-on-surface-variant/50">Senha</span>
                        {"  "}
                        <span className="font-mono text-on-surface">{DEMO_PASSWORD}</span>
                    </p>
                </div>
            </div>

            <form action={formAction} className="space-y-5">
                <div>
                    <label htmlFor="login-email" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        E-MAIL
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" aria-hidden="true" />
                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            placeholder="admin@wasushi.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg bg-surface-highest/60 py-3 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="login-password" className="text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            SENHA
                        </label>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" aria-hidden="true" />
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    {isPending ? "ENTRANDO..." : "ENTRAR"}
                </button>
            </form>
        </div>
    );
}