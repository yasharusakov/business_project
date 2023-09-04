import {useForm, SubmitHandler} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import {object, string} from "yup"
import {useActions} from "../../hooks/useActions"
import './style.scss'

const schema = object({
    email: string().required('email is required').email(),
    password: string().required('password is required'),
}).required()

type Inputs = {
    email: string
    password: string
}

const AdminLoginPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})
    const {setNotification} = useActions()

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, data.email, data.password)
            .then((data) => {
                if (data.user !== null) {
                    navigate('/admin/panel')
                }
            })
            .catch((error) => {
                setNotification({value: error.message, status: 'wrong'})
            })
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-page__container container">
                <form onSubmit={handleSubmit(onSubmit)} className="admin-login-page__form">
                    <input autoComplete="off" placeholder="email" type="text" {...register("email")}/>
                    <p>{errors.email?.message}</p>
                    <input autoComplete="off" placeholder="password" type="password" {...register("password")}/>
                    <p>{errors.password?.message}</p>
                    <button>Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLoginPage