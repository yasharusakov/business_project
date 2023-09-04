import {IProductInCart} from "./IProductInCart"
import {Timestamp} from "firebase/firestore"

export interface IOrder {
    id: string
    fullName: string
    phoneNumber: string
    products: IProductInCart[]
    address: string
    viewed: boolean
    timestamp: Timestamp
}