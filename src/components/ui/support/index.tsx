import {useActions} from "../../../hooks/useActions"
import phone_call from '../../../assets/images/phone-call.png'
import './style.scss'

const Support = () => {
    const {openPopup} = useActions()

    return (
        <div onClick={() => openPopup({name: 'SupportPopup'})} className="support">
            <div className="support__picture">
                <img width={34} height={34} src={phone_call} alt="phone call"/>
            </div>
        </div>
    )
}

export default Support