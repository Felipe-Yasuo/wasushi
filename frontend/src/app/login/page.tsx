import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-surface-lowest px-4 overflow-hidden">

            <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-container/15 blur-[120px]" />

            <div className="relative mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-wider text-on-surface">
                    WASUSHI
                </h1>
                <p className="mt-1 text-sm tracking-[0.2em] text-on-surface-variant">
                    ADMIN DASHBOARD
                </p>
            </div>

            <div className="relative w-full max-w-md rounded-xl bg-surface-high/60 p-8 backdrop-blur-sm">
                <LoginForm />

                <div className="mt-6 text-center">
                    <p className="text-sm text-on-surface-variant">
                        Não tem conta?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-brand-primary hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}