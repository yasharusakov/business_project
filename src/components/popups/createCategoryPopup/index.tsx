import {FormEvent, useEffect, useState} from "react"
import {useActions} from "../../../hooks/useActions"
import {useAppSelector} from "../../../hooks/useAppSelector"
import CategoryService from "../../../services/categoryService"
import Upload from "../../ui/upload"
import Loader from "../../ui/loader"
import './style.scss'

const CreateCategoryPopup = () => {
    const {closePopup} = useActions()
    const data = useAppSelector(state => state.popup.CreateCategoryPopup.data)
    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryName, setCategoryName] = useState<string>('')

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

        if (!categoryName || !file) return

        setLoading(true)

        CategoryService.createCategory(file, categoryName)
            .finally(() => {
                setLoading(false)
                closePopup({name: 'CreateCategoryPopup'})
            })
    }

    const onSubmitHandlerEdit = (e: FormEvent) => {
        e.preventDefault()

        const categoryId = data.id

        if (!categoryName || !categoryId || !url) return

        setLoading(true)

        CategoryService.editCategory(data.url === url ? null : file, categoryId, categoryName)
            .finally(() => {
                setLoading(false)
                closePopup({name: 'CreateCategoryPopup'})
            })
    }

    useEffect(() => {
        if (data?.id) {
            setCategoryName(data.title)
            setUrl(data.url)
        } else {
            setCategoryName('')
            setUrl('')
        }
    }, [data?.id])

    const deletePhoto = () => {
        setFile(null)
        setUrl('')
    }

    return (
        <div className="create-category-popup">
            <div className="create-category-popup__container">
                <form onSubmit={data ? onSubmitHandlerEdit : onSubmitHandler} className="create-category-popup__form">
                    <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="create-category-popup__name" placeholder="Назва категорії" type="text"/>
                    {
                        url ? (
                                <div className="create-category-popup__picture">
                                    <div onClick={deletePhoto} className="create-category-popup__picture__delete-photo">&#x2715;</div>
                                    <img
                                        src={url}
                                        alt={url}
                                    />
                                </div>
                            )
                            :
                            (
                                <Upload
                                    setUrl={setUrl}
                                    setFile={setFile}
                                    file={file}
                                />
                            )

                    }
                    <button disabled={(loading || categoryName.length <= 0 || !url)} type="submit" className="create-category-popup__button">{loading ? <Loader/> : data ? 'Редагувати категорію' : 'Створити категорію'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategoryPopup