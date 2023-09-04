import {NavLink} from "react-router-dom"
import {FC, memo} from "react"
import './style.scss'

interface TabsProps {
    tabs: {value: string, to: string}[]
}

const Tabs: FC<TabsProps> = memo(({tabs}) => {

    return (
        <div className="tabs">
            <div className="tabs__container container">
                {tabs.map((tab, index) => {
                    if (index === 0) {
                        return (
                            <div key={index} className="tabs__tab">
                                <NavLink to={tab.to} end>{tab.value}</NavLink>
                            </div>
                        )
                    }

                    return (
                        <div key={index} className="tabs__tab">
                            <NavLink to={tab.to}>{tab.value}</NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default Tabs