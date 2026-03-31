"use client";

import { useState } from "react";

interface PriceInputProps {
    name: string;
    initialValue?: number;
}

export function PriceInput({ name, initialValue = 0 }: PriceInputProps) {
    const [valueInCents, setValueInCents] = useState(initialValue);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value.replace(/\D/g, "");
        const cents = parseInt(raw || "0", 10);
        setValueInCents(cents);
    }

    const display = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valueInCents / 100);

    return (
        <>
            <input
                type="text"
                inputMode="numeric"
                value={display}
                onChange={handleChange}
                className="w-full rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
            <input type="hidden" name={name} value={String(valueInCents)} />
        </>
    );
}