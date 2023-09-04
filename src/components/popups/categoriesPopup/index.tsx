import {useEffect, useState} from "react"
import {ICategory} from "../../../types/ICategory"
import {useActions} from "../../../hooks/useActions"
import {Link} from "react-router-dom"
import CategoryService from "../../../services/categoryService"
import './style.scss'

const CategoriesPopup = () => {
    const {closePopup} = useActions()
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        CategoryService.getCategories()
            .then(data => {
                if (!data) return

                setCategories(data)
            })
    }, [])

    return (
        <div className="categories-popup">
            <div className="categories-popup__container">
                {categories.map(category => {
                    return (
                        <Link onClick={() => closePopup({name: 'CategoriesPopup'})} to={`/c/${category.id}`} key={category.id} className="categories-popup__category">
                            <div className="categories-popup__category__container">
                                <div className="categories-popup__category__picture">
                                    <img src={category.url} alt={category.title}/>
                                </div>
                                <div className="categories-popup__category__name">{category.title}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoriesPopup