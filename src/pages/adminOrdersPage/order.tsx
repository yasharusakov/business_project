import nova from "../../assets/images/nova.jpg"
import Accordion from "../../components/ui/accordion"
import {IOrder} from "../../types/IOrder"
import {FC, memo, useEffect, useState} from "react"
import ViewService from "../../services/viewService"

const Order: FC<IOrder> = memo(({id, fullName, phoneNumber, address, products, timestamp}) => {
    const [viewed, setViewed] = useState<boolean>(false)

    useEffect(() => {
        const unsub = ViewService.checkViewed(setViewed, `orders/${id}`)

        if (!unsub) return

        return () => {
            unsub()
        }
    }, [])

    return (
        <Accordion
            key={id}
            render={() => {
                return (
                    <div className="admin-orders-page__order__user">
                        <div className="admin-orders-page__order__user__container">
                            <div className="admin-orders-page__order__user__order-data">
                                <div className="admin-orders-page__order__user__full-name">
                                    {fullName}
                                </div>
                                <div className="admin-orders-page__order__user__phone-number">{phoneNumber}</div>
                                <div className="admin-orders-page__order__user__address">
                                    <div className="admin-orders-page__order__user__address__picture">
                                        <img width={24} height={24} src={nova} alt="Нова Пошта"/>
                                    </div>
                                    <div className="admin-orders-page__order__user__address__address">
                                        {address}
                                    </div>
                                </div>
                                <div className="admin-orders-page__order__user__total-price">Усього: <span>{products.reduce((accumulator, currentValue) => (accumulator + currentValue.price * currentValue.amount), 0)} грн</span></div>
                            </div>
                            <div className="admin-orders-page__order__user__additional-order-data">
                                <div className="admin-orders-page__order__user__additional-order-data__timestamp">
                                    {new Date(timestamp.seconds * 1000).toLocaleString()}
                                </div>
                                <div className="admin-orders-page__order__user__additional-order-data__viewed">
                                    {viewed ? <div>Переглянуто</div> : <button onClick={() => ViewService.updateViewed(`orders/${id}`)} >Переглянути</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}>
            <div className="admin-orders-page__order__products">
                {products.map(product => {
                    return (
                        <div key={product.productId} className="admin-orders-page__order__products__product">
                            <div className="admin-orders-page__order__products__product__container">
                                <div className="admin-orders-page__order__products__product__picture">
                                    <img src={product.url} alt={product.title}/>
                                </div>
                                <div className="admin-orders-page__order__products__product__data">
                                    <div className="admin-orders-page__order__products__product__data__title">Назва: <span>{product.title}</span></div>
                                    <div className="admin-orders-page__order__products__product__data__price">Ціна: <span>{product.price} грн</span></div>
                                    <div className="admin-orders-page__order__products__product__data__amout">Кількість: <span>{product.amount}</span></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Accordion>
    )
})

export default Order