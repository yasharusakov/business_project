import {configureStore} from "@reduxjs/toolkit"
import shoppingCartSlice from "./shoppingCartSlice"
import popupSlice from "./popupSlice"
import notificationSlice from "./notificationSlice"

const store = configureStore({
    reducer: {shoppingCart: shoppingCartSlice, popup: popupSlice, notification: notificationSlice},
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store