import {useAppSelector} from "../../../hooks/useAppSelector"
import {useEffect} from "react"
import {useActions} from "../../../hooks/useActions"
import './style.scss'

const Notification = () => {
    const {setNotification} = useActions()
    const {status, value} = useAppSelector(state => state.notification)

    useEffect(() => {
        if (!status || !value) return

        const id = setTimeout(() => {
            setNotification({value: null, status: null})
        }, 3500)

        return () => clearTimeout(id)
    }, [status, value])

    return (
        <div className={`notification ${status} ${status ? 'show' : 'hide'}`}>
            <div className="notification__value">{value}</div>
            {status && <div className="notification__line"></div>}
        </div>
    )
}

export default Notification