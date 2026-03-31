import { Lock } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface-lowest px-4">
            <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-container/15 blur-[120px]" />
            <p className="mb-6 text-sm tracking-[0.2em] text-on-surface-variant">
                WASUSHI
            </p>

            <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-brand-container/20 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-surface-high/60">
                    <Lock className="h-10 w-10 text-brand-primary" />
                </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-on-surface">
                Acesso negado
            </h1>
            <p className="mb-8 max-w-sm text-center text-on-surface-variant">
                Você não tem permissão de administrador para acessar este diretório.
            </p>

            <Link
                href="/login"
                className="rounded-lg bg-gradient-to-r from-brand-container to-brand-primary px-12 py-3 text-sm font-bold tracking-wider text-brand-on-container transition-opacity hover:opacity-90"
            >
                Voltar para login
            </Link>
        </div>
    );
}