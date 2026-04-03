export interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createdAt: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    token: string;
}

export interface Category {
    id: string;
    name: string;
    disabled: boolean;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
    disabled: boolean;
    category_id: string;
    createdAt: string;
    updatedAt: string;
    category?: {
        id: string;
        name: string;
    };
}

export interface OrderItem {
    id: string;
    amount: number;
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        banner: string;
    };
}

export interface Order {
    id: string;
    table: number;
    name?: string;
    status: boolean;
    draft: boolean;
    createdAt: string;
    items?: OrderItem[];
}

export interface TopProduct {
    id: string;
    name: string;
    totalSold: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}