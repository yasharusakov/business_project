import {Link} from "react-router-dom"
import './style.scss'

const Logo = () => {
    return (
        <Link tabIndex={0} to="/">
            <div className="title">
                PowerJizer
            </div>
        </Link>
    )
}

export default Logo