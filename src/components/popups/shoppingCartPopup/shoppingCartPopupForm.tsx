import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {useNavigate} from "react-router-dom"
import {object, string} from "yup"
import {FC, useState} from "react"
import Loader from "../../ui/loader"
import {useAppSelector} from "../../../hooks/useAppSelector"
import {useActions} from "../../../hooks/useActions"
import nova from '../../../assets/images/nova.jpg'
import OrderService from "../../../services/orderService"

const reg = /^\+?3?8?(0\d{9})$/

const schema = object({
    fullName: string().required('Введіть ім\'я та фамілію'),
    phoneNumber: string().required('Введіть мобільний телефон').matches(reg, 'Мобільний телефон введений неправильно'),
    address: string().required('Введіть адрес / відділення Нової Пошти'),
}).required()

type Inputs = {
    fullName: string
    phoneNumber: string
    address: string
}

interface ShoppingCartFormProps {
    setNext: (data: boolean) => void
}

const ShoppingCartPopupForm: FC<ShoppingCartFormProps> = ({setNext}) => {
    const navigate = useNavigate()
    const {clearCart, closePopup, setNotification} = useActions()
    const cart = useAppSelector(state => state.shoppingCart.products)
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<Inputs> = ({fullName, phoneNumber, address}) => {
        setLoading(true)

        OrderService.createOrder(fullName, phoneNumber, address, cart)
            .finally(() => {
                setLoading(false)
                clearCart()
                setNext(false)
                closePopup({name: 'ShoppingCart'})
                navigate('/')
                setNotification({value: 'Замовлення відправлено', status: 'good'})
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input autoComplete="off" placeholder="Ім'я та фамілія" {...register("fullName")} />
            <p>{errors.fullName?.message}</p>
            <input autoComplete="off" placeholder="Мобільний телефон" {...register("phoneNumber")} />
            <p>{errors.phoneNumber?.message}</p>
            <div>
                <img width={24} height={24} src={nova} alt="Нова Пошта"/>
                <input autoComplete="off" placeholder="Адрес / відділення Нової Пошти" {...register("address")} />
            </div>
            <p>{errors.address?.message}</p>
            <button disabled={loading} type="submit" >{loading ? <Loader/> : 'Відправити'}</button>
        </form>
    )
}

export default ShoppingCartPopupForm