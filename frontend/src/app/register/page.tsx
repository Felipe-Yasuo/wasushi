import { RegisterForm } from "@/components/forms/register-form";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface-lowest px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-wider text-on-surface">
                    WASUSHI
                </h1>
                <p className="mt-1 text-sm tracking-[0.2em] text-on-surface-variant">
                    Admin Dashboard
                </p>
            </div>

            <div className="w-full max-w-md rounded-xl bg-surface-high/60 p-8 backdrop-blur-sm">
                <h2 className="mb-1 text-xl font-bold text-on-surface">
                    Crie sua conta
                </h2>
                <p className="mb-6 text-sm text-on-surface-variant">
                    Insira seus dados para gerenciar o restaurante.
                </p>

                <RegisterForm />

                <div className="mt-6 text-center">
                    <p className="text-sm text-on-surface-variant">
                        Já tem conta?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-brand-primary hover:underline"
                        >
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}