import {ReactElement, ReactNode} from "react"

export enum PopupNames {
    ShoppingCart = 'ShoppingCart',
    CategoriesPopup = 'CategoriesPopup',
    CreateCategoryPopup = 'CreateCategoryPopup',
    SupportPopup = 'SupportPopup'
}

export type PopupState = {
    [propName in keyof typeof PopupNames]: {type: boolean, data?: any}
}

export interface IOpenPopupPayloadAction {
    name: keyof typeof PopupNames
    data?: any
}

export interface IClosePopupPayloadAction {
    name: keyof typeof PopupNames
}

export interface IPopup {
    title?: string
    name: keyof typeof PopupNames
    render: () => ReactNode | ReactElement
}
