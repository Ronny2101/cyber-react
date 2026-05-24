import { ProductCollection, ProductSize, ProductStatus, RefrigeratorSize, TvSize } from "../enums/product.enum";

export interface Product {
    //imagePath: string | undefined;
    _id: string;
    productStatus : ProductStatus;
    productCollection : ProductCollection;
    productName : string;
    productPrice: number;
    productLeftCount : number;
    productSize : ProductSize;
    tvSize: TvSize;
    refrigeratorSize: RefrigeratorSize;
    productColor: string;
    productDesc?: string;
    productImages: string[];
    productViews : number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
}


  