import {collection, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc, updateDoc, deleteDoc} from "firebase/firestore"
import {deleteObject, getStorage, listAll, ref} from "firebase/storage"
import {ICategory} from "../types/ICategory"
import UploadService from "./uploadService"
import ProductService from "./productService"

class CategoryService {
    async getCategories() {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, 'categories')
            const q = query(collectionRef, orderBy('timestamp'))
            const docsSnapshot = await getDocs(q)
            return docsSnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as ICategory))
        } catch (err) {
            console.log(err)
        }
    }

    async getCategory(categoryId: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, `/categories/${categoryId}`)
            const docSnapshot = await getDoc(docRef)
            return docSnapshot.data() as ICategory
        } catch (err) {
            console.log(err)
        }
    }

    async createCategory(file: File, title: string) {
        try {
            const db = getFirestore()
            const categoryId = doc(collection(db, 'id')).id
            const docRef = doc(db, 'categories', categoryId)
            await UploadService.uploadOneImageForCategory(file, categoryId)
                .then(async url => {
                    await setDoc(docRef, {
                        url: url,
                        title: title,
                        timestamp: serverTimestamp()
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }

    async editCategory(file: File | null, categoryId: string, title: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, 'categories', categoryId)

            if (!file) {
                await updateDoc(docRef, {
                    title: title
                })
            } else {
                await UploadService.uploadOneImageForCategory(file, categoryId)
                    .then(async url => {
                        await updateDoc(docRef, {
                            url: url,
                            title: title
                        })
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }

    async deleteCategory(categoryId: string) {
        // eslint-disable-next-line no-restricted-globals
        const confirmValue = confirm('Ви дійсно хочете видалити категорію?')

        if (!confirmValue || !categoryId) return

        const db = getFirestore()
        const storage = getStorage()
        const docRef = doc(db, `categories/${categoryId}`)
        const imageRef = ref(storage, `categories/${categoryId}/image`)
        const productsRef = ref(storage, `categories/${categoryId}/products`)

        await deleteDoc(docRef)
            .then(async () => {
                await deleteObject(imageRef)
                await listAll(productsRef)
                    .then(async data => {
                        await Promise.all(data.prefixes.map(async item => {
                            console.log(item.name)
                            await ProductService.deleteProduct(categoryId, item.name, true)
                        }))
                    })
            })
    }
}

export default new CategoryService()