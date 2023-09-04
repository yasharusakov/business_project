import {FC, memo, useEffect, useMemo, useState} from "react"
import {IProduct} from "../../types/IProduct"
import {Link} from "react-router-dom"
import ProductService from "../../services/productService"

interface CategoryPageProducts {
    filterBy: string
    categoryId: string
}

const CategoryPageProducts: FC<CategoryPageProducts> = memo(({filterBy, categoryId}) => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        if (!categoryId) return

        ProductService.getProducts(categoryId)
            .then((data) => {
                if (!data) return
                setProducts(data)
            })
    }, [categoryId])

    const filteredProducts = useMemo(() => {
        return products.sort((a, b) => {
            switch (filterBy) {
                case 'from-cheap-to-expensive':
                    return a.price - b.price
                case 'from-expensive-to-cheap':
                    return b.price - a.price
                default:
                    return 0
            }
        })
    }, [filterBy, products])

    return (
        <div className="cards category-page__products">
            <div className="cards__container">
                {filteredProducts.map((product) => {
                    return (
                        <Link key={product.id} to={`/c/${categoryId}/${product.id}`} tabIndex={0} className="cards__card">
                            <div className="cards__card__container">
                                <div className="cards__card__picture">
                                    <img src={product.url} alt={product.title}/>
                                </div>
                                <div className="cards__card__text">
                                    <div className="cards__card__text__title product">{product.title}</div>
                                    <div className="cards__card__text__price">{product.price} грн</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
})

export default CategoryPageProducts