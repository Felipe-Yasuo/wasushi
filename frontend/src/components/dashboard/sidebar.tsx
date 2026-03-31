import { logoutAction } from "@/actions/auth";
import { ClipboardList, Layers, LogOut, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
    userName: string;
}

export function Sidebar({ userName }: SidebarProps) {
    return (
        <aside className="hidden w-56 flex-col justify-between bg-surface p-6 lg:flex">
            <div>
                <div className="mb-10">
                    <h1 className="text-lg font-bold tracking-wider text-on-surface">
                        WASUSHI
                    </h1>
                    <p className="text-xs text-on-surface-variant">Admin Dashboard</p>
                </div>

                <nav className="space-y-1">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                    >
                        <ClipboardList className="h-4 w-4" />
                        Pedidos
                    </Link>
                    <Link
                        href="/dashboard/categories"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                    >
                        <Layers className="h-4 w-4" />
                        Categorias
                    </Link>
                    <Link
                        href="/dashboard/products"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                    >
                        <UtensilsCrossed className="h-4 w-4" />
                        Produtos
                    </Link>
                </nav>
            </div>

            <form action={logoutAction}>
                <button
                    type="submit"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </button>
            </form>
        </aside>
    );
}