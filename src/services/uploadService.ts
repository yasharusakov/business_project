import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"

class UploadService {
    async uploadOneImageForCategory(file: File, categoryId: string) {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `categories/${categoryId}/image`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async uploadOneImageForProduct(file: File, categoryId: string, productId: string) {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `categories/${categoryId}/products/${productId}/image`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async uploadAdditionalImageForProduct(file: File, categoryId: string, productId: string, id: string) {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `categories/${categoryId}/products/${productId}/images/${id}`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.log(err)
        }
    }

    async uploadImageForMainSlider(file: File, id: string) {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `main-slider/${id}`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.log(err)
        }
    }
}

export default new UploadService()