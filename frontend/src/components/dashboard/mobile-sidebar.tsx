"use client";

import { logoutAction } from "@/actions/auth";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ClipboardList, Layers, LogOut, Menu, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center justify-between bg-surface px-4 py-3 lg:hidden">
            <h1 className="text-lg font-bold tracking-wider text-on-surface">
                WASUSHI
            </h1>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button aria-label="Abrir menu" className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-high">
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 border-0 bg-surface p-6">
                    <SheetTitle className="mb-8 text-lg font-bold tracking-wider text-on-surface">
                        WASUSHI
                    </SheetTitle>

                    <nav className="space-y-1">
                        <Link
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                        >
                            <ClipboardList className="h-4 w-4" />
                            Pedidos
                        </Link>
                        <Link
                            href="/dashboard/categories"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                        >
                            <Layers className="h-4 w-4" />
                            Categorias
                        </Link>
                        <Link
                            href="/dashboard/products"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                        >
                            <UtensilsCrossed className="h-4 w-4" />
                            Produtos
                        </Link>
                    </nav>

                    <form action={logoutAction} className="mt-auto pt-8">
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                        >
                            <LogOut className="h-4 w-4" />
                            Sair
                        </button>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}