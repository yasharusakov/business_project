import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {ICategory} from "../../types/ICategory"
import CategoryPageProducts from "./categoryPageProducts"
import Loader from "../../components/ui/loader"
import CategoryService from "../../services/categoryService"
import './style.scss'

type CategoryPageParams = {
    categoryId: string
}

const CategoryPage = () => {
    const {categoryId} = useParams<CategoryPageParams>()
    const [category, setCategory] = useState<ICategory>({} as ICategory)
    const [loading, setLoading] = useState<boolean>(true)
    const [filterBy, setFilterBy] = useState<string>('from-cheap-to-expensive')

    useEffect(() => {
        if (!categoryId) return

        CategoryService.getCategory(categoryId)
            .then(data => {
                if (!data) return
                setCategory(data)
            })
            .finally(() => setLoading(false))
    }, [categoryId])

    if (loading) return <Loader/>

    return (
        <div className="category-page">
            <div style={{paddingTop: 30, paddingBottom: 30}} className="category-page__container container">
                <h1 className="category-page__title">{category?.title}</h1>
                <div className="category-page__filters">
                    <select onChange={(e) => setFilterBy(e.target.value)}>
                        <option value="from-cheap-to-expensive">Від дешевих до дорогих</option>
                        <option value="from-expensive-to-cheap">Від дорогих до дешевих</option>
                    </select>
                </div>
                {categoryId && <CategoryPageProducts filterBy={filterBy} categoryId={categoryId}/>}
            </div>
        </div>
    )
}

export default CategoryPage