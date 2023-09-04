import {collection, getDocs, getFirestore, limit, orderBy, query, startAfter} from "firebase/firestore"
import {IOrder} from "../types/IOrder"

class UtilsService {
    async nextData(path: string, setData: {(data: any): void}, setLastVisibleDoc: {(data: any): void}, lastVisible: any, lastVisibleDoc: any) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, path)
            const visible = !lastVisibleDoc ? lastVisible : lastVisibleDoc
            const q = query(collectionRef, orderBy('timestamp', 'desc'), startAfter(visible), limit(15))
            const docsSnap = await getDocs(q)
            const docsData = docsSnap.docs.map(doc => ({id: doc.id, ...doc.data()})) as IOrder[]
            setData((data: any) => [...data, ...docsData])
            setLastVisibleDoc(docsSnap.docs.at(-1))
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UtilsService()