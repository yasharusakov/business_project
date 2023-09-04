import {Timestamp} from "firebase/firestore"

export interface ICategory {
    id: string
    url: string
    title: string
    timestamp: Timestamp
}