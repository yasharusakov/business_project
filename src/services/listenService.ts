import {collection, doc, getFirestore, limit, onSnapshot, orderBy, OrderByDirection, query} from "firebase/firestore"
import {removeDuplicateObjects} from "../utils/removeDuplicateObjects"

class ListenService {
    listenDocs(setData: {(data: any): void}, path: string, orderByValue: OrderByDirection, setLastVisible?: {(data: any): void}) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, path)
            const q = query(collectionRef, orderBy('timestamp', orderByValue), limit(15))
            return onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    setData((data: any) => removeDuplicateObjects([...querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})), ...data], 'id'))
                    if (setLastVisible) {
                        setLastVisible!(querySnapshot.docs.at(-1))
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    listenDoc(setData: {(data: any): void}, path: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, path)
            return onSnapshot(docRef, querySnapshot => {
                setData(querySnapshot.data())
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export default new ListenService()