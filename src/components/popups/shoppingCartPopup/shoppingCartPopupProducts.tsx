import ShoppingCartPopupCounter from "./shoppingCartPopupCounter"
import {IShoppingCart} from "../../../types/IShoppingCart"
import {FC, memo} from "react"
import {useActions} from "../../../hooks/useActions"

const ShoppingCartPopupProducts: FC<IShoppingCart> = memo(({products}) => {
    const {removeFromCart} = useActions()

    return (
        <div className="shopping-cart-popup__products">
            <div className="shopping-cart-popup__products__container">
                {products.map(({categoryId, productId, url, title, amount, price}) => {
                    return (
                        <div key={productId} className="shopping-cart-popup__product">
                            <div onClick={() => removeFromCart({categoryId, productId})} className="shopping-cart-popup__product__remove">✕</div>
                            <div className="shopping-cart-popup__product__row">
                                <div className="shopping-cart-popup__product__column shopping-cart-popup__product__column_1">
                                    <div className="shopping-cart-popup__product__picture">
                                        <img src={url} alt={title}/>
                                    </div>
                                    <div className="shopping-cart-popup__product__data__product-title">{title}</div>
                                </div>
                                <div className="shopping-cart-popup__product__column shopping-cart-popup__product__column_2">
                                    <div className="shopping-cart-popup__product__additional-data">
                                        <ShoppingCartPopupCounter categoryId={categoryId} productId={productId} amount={amount} />
                                        <div className="shopping-cart-popup__product__additional-data__additional-data__price">{price} грн</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default ShoppingCartPopupProducts