export interface Product {
    id: string;
    name: string;
    code: string;
    description: string;
    brand: string;
    category: string;
    purchasePrice: number;
    salePrice: number;
    stockQuantity: number;
    imageUrl: string;
    isActive: boolean;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}