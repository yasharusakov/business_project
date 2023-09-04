import {useState} from "react"
import Loader from "../../ui/loader"
import {object, string} from "yup"
import {SubmitHandler, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {useActions} from "../../../hooks/useActions"
import QuestionService from "../../../services/questionService"
import './style.scss'

const reg = /^\+?3?8?(0\d{9})$/

const schema = object({
    fullName: string().required('Введіть Ім\'я та фамілію'),
    phoneNumber: string().required('Введіть мобільний телефон').matches(reg, 'Мобільний телефон введений неправильно'),
    question: string().required('Введіть запитання')
}).required()

type Inputs = {
    fullName: string
    phoneNumber: string
    question: string
}

const SupportPopup = () => {
    const {closePopup, setNotification} = useActions()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = ({fullName, phoneNumber, question}) => {
        setLoading(true)

        QuestionService.createQuestion(fullName, phoneNumber, question)
            .finally(() => {
                setLoading(false)
                closePopup({name: 'SupportPopup'})
                setNotification({value: 'Запитання відправлено', status: 'good'})
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="support-popup">
            <input autoComplete="off" placeholder="Ім'я та фамілія"  type="text" {...register("fullName")} />
            <p>{errors.fullName?.message}</p>
            <input autoComplete="off" placeholder="Номер телефону" type="text" {...register("phoneNumber")} />
            <p>{errors.phoneNumber?.message}</p>
            <textarea autoComplete="off" placeholder="Ваше запитання" {...register("question")} />
            <p>{errors.question?.message}</p>
            <button disabled={loading} type="submit">{loading ? <Loader/> : 'Відправити'}</button>
        </form>
    )
}

export default SupportPopup