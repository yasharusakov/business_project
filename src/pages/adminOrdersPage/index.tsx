import {useEffect, useState} from "react"
import {IOrder} from "../../types/IOrder"
import OrderService from "../../services/orderService"
import UtilsService from "../../services/utilsService"
import Order from "./order"
import './style.scss'

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [lastVisible, setLastVisible] = useState<any>()
    const [lastVisibleDoc, setLastVisibleDoc] = useState<any>()

    useEffect(() => {
        const unsub = OrderService.getOrders(setOrders, setLastVisible)

        if (!unsub) return

        return () => {
            unsub()
        }
    }, [])

    return (
        <div className="admin-orders-page">
            <div className="admin-orders-page__container">
                {orders.map(order => <Order key={order.id} {...order} />)}
            </div>
            <button className="load" onClick={() => UtilsService.nextData('orders', setOrders, setLastVisibleDoc, lastVisible, lastVisibleDoc)}>Load</button>
        </div>
    )
}

export default AdminOrdersPage