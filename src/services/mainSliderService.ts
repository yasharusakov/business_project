import {collection, deleteDoc, doc, getDocs, getFirestore, setDoc} from "firebase/firestore"
import {deleteObject, getStorage, ref} from "firebase/storage"
import UploadService from "./uploadService"

class MainSliderService {
    async getSlides() {
        const db = getFirestore()
        const collectionRef = collection(db, 'main-slider')
        const docsSnap = await getDocs(collectionRef)
        return docsSnap.docs.map(doc => ({id: doc.id, ...doc.data()}))
    }

    async createSlides(files: File[], deletedImages?: {id: string, url: string}[]) {
        if (files.length) {
            await Promise.all(files.map(async file => {
                const db = getFirestore()
                const id = doc(collection(db, 'id')).id
                const docRef = doc(db, 'main-slider', id)

                await UploadService.uploadImageForMainSlider(file, id)
                    .then(async (url) => {
                        await setDoc(docRef, {
                            url: url
                        })
                    })

            }))
        }

        if (deletedImages) {
            await Promise.all(deletedImages.map(async item => {
                const db = getFirestore()
                const storage = getStorage()
                const docRef = doc(db, `main-slider/${item.id}`)
                const storageRef = ref(storage, `main-slider/${item.id}`)
                await deleteObject(storageRef)
                await deleteDoc(docRef)
            }))
        }
    }
}

export default new MainSliderService()