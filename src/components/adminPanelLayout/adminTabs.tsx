import {NavLink} from "react-router-dom"
import {useEffect, useState} from "react"
import ViewService from "../../services/viewService"

const AdminTabs = () => {
    const [countOfOrders, setCountOfOrders] = useState<number>(0)
    const [countOfQuestions, setCountOfQuestions] = useState<number>(0)

    useEffect(() => {
        ViewService.getCountOfNotViewed(setCountOfOrders, 'orders')
        ViewService.getCountOfNotViewed(setCountOfQuestions, 'questions')
    }, [])

    const adminTabs = [
        {to: '/admin/panel', value: 'Категорії'},
        {to: '/admin/otherwise', value: 'Інше'},
        {to: '/admin/orders', value: 'Замовлення'},
        {to: '/admin/questions', value: 'Запитання'}
    ]

    return (
        <div className="tabs">
            <div className="tabs__container container">
                {adminTabs.map((tab, index) => {
                    if (index === 0) {
                        return (
                            <div key={index} className="tabs__tab">
                                <NavLink to={tab.to} end>{tab.value}</NavLink>
                            </div>
                        )
                    }

                    return (
                        <div key={index} className="tabs__tab">
                            <NavLink to={tab.to}>
                                {tab.value}
                            </NavLink>
                            {
                                tab.to !== '/admin/otherwise' && <div className="count">{tab.to === '/admin/orders' ? countOfOrders : countOfQuestions}</div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminTabs