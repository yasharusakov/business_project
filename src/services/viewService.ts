import {collection, doc, getFirestore, onSnapshot, query, updateDoc, where} from "firebase/firestore"
import {IOrder} from "../types/IOrder"

class ViewService {
    checkViewed(setViewed: {(viewed: boolean): void}, path: string) {
        const db = getFirestore()
        const docRef = doc(db, path)
        return onSnapshot(docRef, (querySnapshot) => {
            setViewed((querySnapshot.data() as IOrder).viewed)
        })
    }

    async updateViewed(path: string) {
        const db = getFirestore()
        const docRef = doc(db, path)
        await updateDoc(docRef, {
            viewed: true
        })
    }

    getCountOfNotViewed(setCount: {(count: number): void}, path: string) {
        const db = getFirestore()
        const collectionRef = collection(db, path)
        const q = query(collectionRef, where('viewed', '==', false))
        return onSnapshot(q, (querySnapshot) => {
            setCount(querySnapshot.docs.length)
        })
    }
}

export default new ViewService()