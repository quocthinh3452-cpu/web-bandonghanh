export interface Companion {
    id: number;
    fullName: string;
    gender: number; // 0: Nữ, 1: Nam
    age: number;
    location: string;
    pricePerHour: number;
    avatarUrl: string;
    description?: string;
}