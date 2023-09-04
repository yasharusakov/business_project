import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit"
import {PopupState, IOpenPopupPayloadAction, IClosePopupPayloadAction} from "../types/popup"

const initialState: PopupState = {
	ShoppingCart: {type: false, data: null},
	CategoriesPopup: {type: false, data: null},
	CreateCategoryPopup: {type: false, data: null},
	SupportPopup: {type: false, data: null}
}

const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		openPopup(state: Draft<PopupState>, action: PayloadAction<IOpenPopupPayloadAction>) {
			state[action.payload.name] = {type: true, data: action.payload.data ? action.payload.data : null}
		},
		closePopup(state: Draft<PopupState>, action: PayloadAction<IClosePopupPayloadAction>) {
			state[action.payload.name] = {type: false, data: null}
		}
	}
})

export default popupSlice.reducer

export const {
	openPopup,
	closePopup
} = popupSlice.actions