import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit"

interface INotification {
    value: string | null
    status: 'good' | 'wrong' | null
}

const initialState: INotification = {
    value: null,
    status: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state: Draft<INotification>, payload: PayloadAction<INotification>) {
            state.value = payload.payload.value
            state.status = payload.payload.status
        }
    }
})

export default notificationSlice.reducer

export const {
    setNotification
} = notificationSlice.actions