import empty_cart from "../../../assets/images/empty-cart.png"

const ShopingCartPopupEmptyCart = () => {
    return (
        <div className="shopping-cart-popup__empty">
            <div className="shopping-cart-popup__empty__picture">
                <img width={128} height={128} src={empty_cart} alt="empty cart"/>
            </div>
            <div className="shopping-cart-popup__empty__title">
                Кошик пустий
            </div>
            <div className="shopping-cart-popup__empty__sub-title">
                Але це ніколи не пізно виправити :)
            </div>
        </div>
    )
}

export default ShopingCartPopupEmptyCart