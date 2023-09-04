import {FC, ReactNode} from "react"
import Header from "../header"
import Footer from "../footer"
import './style.scss'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className="layout">
            <div className="layout__container">
                <Header/>
                <main className="layout__content">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout