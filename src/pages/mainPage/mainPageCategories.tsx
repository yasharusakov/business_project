import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {ICategory} from "../../types/ICategory"
import CategoryService from "../../services/categoryService"
import Loader from "../../components/ui/loader"
import '../../assets/styles/cards.scss'

const MainPageCategories = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        CategoryService.getCategories()
            .then(data => {
                if (!data) return
                setCategories(data)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <Loader/>

    return (
        <div className="cards">
            <div className="cards__container">
                {categories.map(category => {
                    return (
                        <Link key={category.id} to={`/c/${category.id}`} className="cards__card">
                            <div className="cards__card__container">
                                <div className="cards__card__picture">
                                    <img src={category.url} alt={category.title}/>
                                </div>
                                <div className="cards__card__text">
                                    <div className="cards__card__text__title category">{category.title}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPageCategories