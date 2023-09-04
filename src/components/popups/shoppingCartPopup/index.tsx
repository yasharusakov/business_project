import {useState} from "react"
import {useAppSelector} from "../../../hooks/useAppSelector"
import ShoppingCartPopupForm from "./shoppingCartPopupForm"
import ShoppingCartPopupProducts from "./shoppingCartPopupProducts"
import ShopingCartPopupEmptyCart from "./shopingCartPopupEmptyCart"
import './style.scss'

const ShoppingCartPopup = () => {
    const [next, setNext] = useState<boolean>(false)
    const cart = useAppSelector(state => state.shoppingCart.products)

    return (
        <div className="shopping-cart-popup">
            <div className="shopping-cart-popup__container">
                {cart.length > 0 ? (
                    <>
                        {!next ? <ShoppingCartPopupProducts products={cart} /> : <ShoppingCartPopupForm setNext={setNext} />}
                        <div className="shopping-cart-popup__next">
                            {!next ? (
                                <>
                                    <div className="shopping-cart-popup__next__total-price">Усього: {cart.reduce((accumulator, currentValue) => (accumulator + currentValue.price * currentValue.amount), 0)} грн</div>
                                    <button onClick={() => setNext(true)} className="shopping-cart-popup__next__button-next">Далі</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setNext(false)} className="shopping-cart-popup__next__button-next">Повернутися</button>
                                </>
                            )}
                        </div>
                    </>
                ) : <ShopingCartPopupEmptyCart/>}
            </div>
        </div>
    )
}

export default ShoppingCartPopup