import {collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore"
import {deleteObject, getStorage, list, ref} from "firebase/storage"
import {IProduct} from "../types/IProduct"
import UploadService from "./uploadService"

class ProductService {
    async getProducts(categoryId: string) {
        try {
            const db = getFirestore()
            const collectionRef = collection(db, `categories/${categoryId}/items`)
            const q = query(collectionRef, orderBy('timestamp'))
            const docsSnapshot = await getDocs(q)
            return docsSnapshot.docs.map(doc => ({...doc.data(), id: doc.id} as IProduct))
        } catch (err) {
            console.log(err)
        }
    }

    async getProduct(categoryId: string, productId: string) {
        try {
            const db = getFirestore()
            const docRef = doc(db, `categories/${categoryId}/items/${productId}`)
            const collectionRef = collection(db, `categories/${categoryId}/items/${productId}/images`)

            const docSnapshot = await getDoc(docRef)
            const docsSnapshot = await getDocs(collectionRef)

            const docData = docSnapshot.data()
            const docsData = docsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as {id: string, url: string}))

            return {...docData, images: docsData} as IProduct
        } catch (err) {
            console.log(err)
        }
    }

    async createProduct(categoryId: string, file: File, title: string, price: number, characteristics: string, additionalImages?: File[]) {
        const db = getFirestore()
        const productId = doc(collection(db, 'id')).id
        const docRef = doc(db, `categories/${categoryId}/items`, productId)

        const urls: {url: string, id: string}[] = []

        additionalImages?.forEach(file => {
            if (!file) return
            const id = doc(collection(db, 'id')).id
            UploadService.uploadAdditionalImageForProduct(file, categoryId, productId, id)
                .then(urlImage => {
                    if (!urlImage) return
                    urls.push({url: urlImage, id: id})
                })
        })

        await UploadService.uploadOneImageForProduct(file, categoryId, productId)
            .then(async url => {
                await setDoc(docRef, {
                    url: url,
                    title: title,
                    price: +price,
                    characteristics: characteristics,
                    timestamp: serverTimestamp()
                })
                    .then(() => {
                        urls.forEach(({url, id}) => {
                            const docRef2 = doc(db, `categories/${categoryId}/items/${productId}/images`, id)
                            setDoc(docRef2, {url: url})
                        })
                    })
            })
    }

    async editProduct(file: File | null, categoryId: string, productId: string, title: string, price: number, characteristics: string, additionalImages: File[] | null, newDeletedImages: {id: string, url: string}[] | null) {
        try {
            const db = getFirestore()
            const docRef = doc(db, `categories/${categoryId}/items`, productId)

            if (!file) {
                await updateDoc(docRef, {
                    title: title,
                    price: price,
                    characteristics: characteristics
                })
            }

            if (file) {
                await UploadService.uploadOneImageForProduct(file, categoryId, productId)
                    .then(async url => {
                        await updateDoc(docRef, {
                            url: url,
                            title: title,
                            price: price,
                            characteristics: characteristics
                        })
                    })
            }

            if (additionalImages) {
                await additionalImages.forEach(file => {
                    if (!file) return
                    const id = doc(collection(db, 'id')).id
                    UploadService.uploadAdditionalImageForProduct(file, categoryId, productId, id)
                        .then(urlImage => {
                            if (!urlImage) return
                            const docRef2 = doc(db, `categories/${categoryId}/items/${productId}/images`, id)
                            setDoc(docRef2, {url: urlImage})
                        })
                })

            }

            if (newDeletedImages) {
                await newDeletedImages.forEach(image => {
                    const db = getFirestore()
                    const storage = getStorage()
                    const docRef = doc(db, `categories/${categoryId}/items/${productId}/images`, image.id)
                    const storageRef = ref(storage, `categories/${categoryId}/products/${productId}/images/${image.id}`)
                    deleteObject(storageRef)
                    deleteDoc(docRef)
                })
            }

        } catch (err) {
            console.log(err)
        }
    }

    async deleteProduct(categoryId: string, productId: string, deleteCategory?: boolean) {

        const check = () => {
            let value = false

            if (deleteCategory) {
                return true
            } else {
                // eslint-disable-next-line no-restricted-globals
                value = confirm('Ви дійсно хочете видалити продукт?')
            }

            return value
        }

        const confirmValue = check()

        if (!confirmValue || !categoryId || !productId) return

        const db = getFirestore()
        const storage = getStorage()
        const docRef = doc(db, `categories/${categoryId}/items/${productId}`)
        const imageRef = ref(storage, `categories/${categoryId}/products/${productId}/image`)
        const imagesRef = ref(storage, `categories/${categoryId}/products/${productId}/images`)

        await deleteDoc(docRef)
            .then(async () => {
                await deleteObject(imageRef)
                await list(imagesRef)
                    .then(async data => {
                        await Promise.all(data.items.map(async item => {
                            const itemRef = ref(storage, item.fullPath)
                            await deleteObject(itemRef)
                        }))
                    })
            })

    }
}

export default new ProductService()