import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItemInput {   //orderInput
    itemQuantity: number;
    itemPrice: number;
    productId: string;
    orderId?: string;
}

export interface OrderItem {  //order
    _id: string;
    itemQuantity: number;
    itemPrice: number;
    orderId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {  //order
    _id: string;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
    /*from aggregation */
    orderItems: OrderItem[];
    productData: Product[];
}

export interface OrderInquiry {  //orderInput
    page: number;
    limit: number;
    orderStatus: OrderStatus;  
}


export interface OrderUpdateInput {  //orderUpdate
    orderId: string;
    orderStatus: OrderStatus;  
}