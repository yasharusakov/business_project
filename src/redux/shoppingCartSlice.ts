import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit"
import {IShoppingCart} from "../types/IShoppingCart"
import {IProductInCart} from "../types/IProductInCart"
import {removeDuplicateObjects} from "../utils/removeDuplicateObjects"

const initialState: IShoppingCart = {
    products: []
}

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        getProducts(state: Draft<IShoppingCart>) {
            if (localStorage.getItem('shoppingCart')) {
                const dataFromLocalStorage = localStorage.getItem('shoppingCart')
                state.products = removeDuplicateObjects([...JSON.parse(dataFromLocalStorage!)], 'productId')
            }
        },
        addToCart(state: Draft<IShoppingCart>, action: PayloadAction<IProductInCart>) {
            if (localStorage.getItem('shoppingCart')) {
                const dataFromLocalStorage = localStorage.getItem('shoppingCart')
                state.products = removeDuplicateObjects([...JSON.parse(dataFromLocalStorage!), action.payload], 'productId')
            }

            const products = removeDuplicateObjects([...state.products, action.payload], 'productId')
            state.products = products
            localStorage.setItem('shoppingCart', JSON.stringify(products))
        },
        removeFromCart(state: Draft<IShoppingCart>, action) {
            const products = state.products.filter(product => !(product.productId === action.payload.productId && product.categoryId === action.payload.categoryId))
            state.products = products
            localStorage.setItem('shoppingCart', JSON.stringify(products))
        },
        increaseAmount(state: Draft<IShoppingCart>, action) {
            const products = state.products.map(product => {
                if (product.productId === action.payload.productId && product.categoryId === action.payload.categoryId) {
                    return {
                        ...product,
                        amount: product.amount + 1
                    }
                }

                return product
            })

            state.products = products
            localStorage.setItem('shoppingCart', JSON.stringify(products))
        },
        decreaseAmount(state: Draft<IShoppingCart>, action) {
            const products = state.products.map(product => {
                if (product.productId === action.payload.productId && product.categoryId === action.payload.categoryId) {
                    return {
                        ...product,
                        amount: product.amount - 1
                    }
                }

                return product
            })

            state.products = products
            localStorage.setItem('shoppingCart', JSON.stringify(products))
        },
        clearCart(state) {
            state.products = []
            localStorage.setItem('shoppingCart', '')
        }
    }
})

export default shoppingCartSlice.reducer

export const {
    getProducts,
    addToCart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    clearCart
} = shoppingCartSlice.actions