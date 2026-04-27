const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function getApiUrl() {
    return API_URL;
}

interface FetchOptions extends RequestInit {
    token?: string;
    cache?: "force-cache" | "no-store";
    next?: {
        revalidate?: false | 0 | number;
        tags?: string[];
    };
}

export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        ...(fetchOptions.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(fetchOptions.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    let response: Response;
    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...fetchOptions,
            headers,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Falha ao conectar com o servidor (${API_URL}${endpoint}): ${message}`);
    }

    if (!response.ok) {
        const rawText = await response.text().catch(() => "");
        let parsed: { error?: string } | null = null;
        try {
            parsed = rawText ? JSON.parse(rawText) : null;
        } catch {
            parsed = null;
        }

        const fallback = rawText
            ? `HTTP ${response.status}: ${rawText.slice(0, 200)}`
            : `HTTP ${response.status} ${response.statusText || "sem corpo"}`;

        const message = parsed?.error || fallback;

        if (response.status === 401) {
            const authError = new Error(parsed?.error || "Sessão expirada");
            (authError as any).status = 401;
            throw authError;
        }

        throw new Error(message);
    }

    return response.json();
}