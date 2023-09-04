import {useNavigate} from 'react-router-dom'
import './style.scss'

const Page404 = () => {
    const navigate = useNavigate()

    return (
        <div className="page-404">
            <div className="page-404__title">404</div>
            <button onClick={() => navigate(-1)} className="page-404__go-back">Повернутися</button>
        </div>
    )
}

export default Page404