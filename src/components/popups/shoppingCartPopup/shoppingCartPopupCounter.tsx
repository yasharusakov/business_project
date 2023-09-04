import {FC, memo} from "react"
import {useActions} from "../../../hooks/useActions"

interface CounterProps {
    categoryId: string
    productId: string
    amount: number
}

const ShoppingCartPopupCounter: FC<CounterProps> = memo(({categoryId, productId, amount}) => {
    const {increaseAmount, decreaseAmount} = useActions()

    const increase = () => {
        if (!categoryId || !productId) return
        increaseAmount({categoryId, productId})
    }

    const decrease = () => {
        if (!categoryId || !productId || amount === 1) return
        decreaseAmount({categoryId, productId})
    }

    return (
        <div className="counter">
            <div onClick={increase} className="counter__plus">&#10133;</div>
            <div className="counter__amount">{amount}</div>
            <div onClick={decrease} className="counter__minus">&#10134;</div>
        </div>
    )
})

export default ShoppingCartPopupCounter