import {collection, doc, getFirestore, serverTimestamp, setDoc} from "firebase/firestore"
import {IProductInCart} from "../types/IProductInCart"
import ListenService from "./listenService"

class OrderService {
    getOrders(setData: { (data: any): void }, setLastVisible?: {(data: any): void}) {
        return ListenService.listenDocs(setData, 'orders', 'desc', setLastVisible)
    }

    async createOrder(fullName: string, phoneNumber: string, address: string, products: IProductInCart[]) {
        const db = getFirestore()
        const id = doc(collection(getFirestore(), 'id')).id
        const docRef = doc(db, 'orders', id)
        await setDoc(docRef, {
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            products: products,
            viewed: false,
            timestamp: serverTimestamp()
        })
    }
}

export default new OrderService()