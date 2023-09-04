import {FC, memo, ReactNode, useId} from "react"
import './style.scss'

interface AccordionProps {
    render: () => ReactNode
    children: ReactNode
}

const Accordion: FC<AccordionProps> = memo(({render, children}) => {
    const id = useId()

    return (
        <div className="accordion">
            <input type="checkbox" id={`checkbox${id}`}/>
            <label className="accordion__label" htmlFor={`checkbox${id}`}>{render()}</label>
            <div className="accordion__content">
                {children}
            </div>
        </div>
    )
})

export default Accordion