import {Timestamp} from "firebase/firestore"

export interface IQuestion {
    id: string
    fullName: string
    phoneNumber: string
    question: string
    timestamp: Timestamp
}