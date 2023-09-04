import Upload from "../../components/ui/upload"
import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Loader from "../../components/ui/loader"
import ProductService from "../../services/productService"
import delete_icon from '../../assets/images/delete.png'
import './style.scss'

type AdminCreateProductPageParams = {
    categoryId: string
    productId?: string
}

const AdminCreateProductPage = () => {
    const {categoryId, productId} = useParams<AdminCreateProductPageParams>()
    const [loading, setLoading] = useState<boolean>(false)

    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<number>()

    const [characteristics, setCharacteristics] = useState<string>('')

    const [images, setImages] = useState<File[]>([])
    const [imagesUrl, setImagesUrl] = useState<{id: string, url: string}[]>([])
    const [imagesData, setImagesData] = useState<{id: string, url: string}[]>([])
    const [deletedImages, setDeletedImages] = useState<{id: string, url: string}[]>([])

    useEffect(() => {
        if (!categoryId || !productId) return

        ProductService.getProduct(categoryId, productId)
            .then(data => {
                if (!data) return
                setUrl(data.url)
                setTitle(data.title)
                setPrice(data.price)
                setCharacteristics(data.characteristics)
                setImagesData(data.images)
            })


    }, [categoryId, productId])

    const deletePhoto = () => {
        setFile(null)
        setUrl('')
    }

    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!categoryId) return

        setLoading(true)

        if (productId) {
            const data = (url && !file) ? null : file
            const data2 = images.length ? images : null
            const newDeletedImages = deletedImages.filter(item => item.id.length > 3)

            ProductService.editProduct(data, categoryId, productId, title, Number(price), characteristics, data2, newDeletedImages.length ? newDeletedImages : null)
                .finally(() => {
                    setLoading(false)
                })
        } else {
            ProductService.createProduct(categoryId, file!, title, Number(price), characteristics, images)
                .finally(() => {
                    setLoading(false)
                })
        }

    }

    const deleteAdditionalImage = (id: string, url: string, index: number) => {
        if (id.length > 3) {
            setImagesData((imagesData) => imagesData.filter(item => item.id !== id))
            setDeletedImages(deletedImages => [...deletedImages, {id, url}])
        } else {
            setImages(images => images.filter((item, i) => i !== index))
            setImagesUrl(imagesUrl => imagesUrl.filter(item => item.url !== url))
            setDeletedImages(deletedImages => [...deletedImages, {id, url}])
        }
    }

    const createUrl = (images: File[]) => {
        const data = images.map((image, index) => {
            const creator = window.URL || window.webkitURL
            return {id: `${index}`, url: creator.createObjectURL((image as Blob))}
        })
        setImagesUrl(data)
    }

    useEffect(() => {
        if (!images.length) return
        createUrl(images)
    }, [images.length])

    return (
        <div className="admin-create-product-page">
            <form onSubmit={onHandleSubmit}>
                <div className="admin-create-product-page__container">
                    <div className="admin-create-product-page__column admin-create-product-page__column_1">
                        <div className="admin-create-product-page__inputs">
                            <input placeholder="Назва продукту" value={title} onChange={(e) => setTitle(e.target.value)} type="text"/>
                            <input placeholder="Ціна продукту" value={price} onChange={(e) => setPrice(+e.target.value.replace(/\D/g, ''))} type="text"/>
                        </div>
                        <div className="admin-create-product-page__images">
                            <div className="admin-create-product-page__picture">
                                {
                                    url ? (
                                        <>
                                            <div onClick={deletePhoto} className="admin-create-product-page__delete-photo">&#x2715;</div>
                                            <img src={url}/>
                                        </>
                                    ) : <Upload setFile={setFile} setUrl={setUrl} file={file}/>
                                }
                            </div>
                            <div className="admin-create-product-page__images__additional">
                                {[...imagesData, ...imagesUrl]?.map((image, index) => {
                                    return (
                                        <div onClick={() => deleteAdditionalImage(image.id, image.url, index)} key={index} className="admin-create-product-page__images__additional__image">
                                            <img src={image.url} alt={image.url}/>
                                            <div className="delete_icon">
                                                <img src={delete_icon} alt="delete_icon"/>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="admin-create-product-page__images__additional__add-image">
                                    +
                                    <input multiple onChange={(e: ChangeEvent<HTMLInputElement>) => setImages(images => [...images, ...e.target.files!])} accept=".jpg,.jpeg,.png" type="file"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-create-product-page__column admin-create-product-page__column_2">
                        <textarea placeholder="Характеристики" value={characteristics} onChange={(e) => setCharacteristics(e.target.value)} />
                    </div>
                </div>
                <button
                    disabled={(
                        loading ||
                        !categoryId ||
                        !url ||
                        !title ||
                        !characteristics ||
                        !price
                    )}
                    type="submit">
                    {
                        loading ?
                            <Loader/> :
                            productId ? 'Редагувати продукт' : 'Створити продукт'
                    }
                </button>
            </form>
        </div>
    )
}

export default AdminCreateProductPage