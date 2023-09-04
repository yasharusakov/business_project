import {ReactNode, FC} from "react"
import AdminTabs from "./adminTabs"
import './style.scss'

interface AdminPagePanelProps {
    children: ReactNode
}

const AdminPanelLayout: FC<AdminPagePanelProps> = ({children}) => {

    return (
        <div className="admin-panel-layout">
            <div className="admin-panel-layout__container">
                <AdminTabs/>
                <div className="admin-panel-layout__content container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminPanelLayout