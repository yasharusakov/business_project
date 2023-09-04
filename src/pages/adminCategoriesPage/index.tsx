import {useActions} from "../../hooks/useActions"
import {useEffect, useState} from "react"
import {ICategory} from "../../types/ICategory"
import Loader from "../../components/ui/loader"
import delete_icon from "../../assets/images/delete.png"
import edit_icon from "../../assets/images/pencil.png"
import Popup from "../../components/popup"
import CreateCategoryPopup from "../../components/popups/createCategoryPopup"
import {Link} from "react-router-dom"
import ListenService from "../../services/listenService"
import CategoryService from "../../services/categoryService"
import './style.scss'

const AdminCategoriesPage = () => {
    const {openPopup} = useActions()
    const [loading, setLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<ICategory[]>([])

    const deleteCategory = async (categoryId: string) => {
        await CategoryService.deleteCategory(categoryId)
    }

    useEffect(() => {
        const unsub = ListenService.listenDocs(setCategories, 'categories', 'asc')

        setLoading(false)

        if (!unsub) return

        return () => unsub()
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="admin-categories-page">
            <button onClick={() => openPopup({name: 'CreateCategoryPopup'})} className="admin-categories-page__create-category">Створити категорію</button>
            <div className="cards">
                <div className="cards__container">
                    {categories.map(category => {
                        return (
                            <div key={category.id} className="cards__card">
                                <div className="cards__card__container">
                                    <Link to={`/admin/panel/с/${category.id}`} className="cards__card__picture">
                                        <img src={category.url} alt={category.title}/>
                                    </Link>
                                    <div className="cards__card__text admin">
                                        <div className="cards__card__text__title category">{category.title}</div>
                                        <div className="cards__card__text__icons">
                                            <div onClick={() => openPopup({name: 'CreateCategoryPopup', data: category})} className="edit_icon">
                                                <img src={edit_icon} alt="edit_icon" style={{width: 24, height: 24}}/>
                                            </div>
                                            <div onClick={() => deleteCategory(category.id)} className="delete_icon">
                                                <img src={delete_icon} alt="delete_icon" style={{width: 24, height: 24}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Popup title="Створення категорії" name='CreateCategoryPopup' render={() => <CreateCategoryPopup/>}/>
        </div>
    )
}

export default AdminCategoriesPage