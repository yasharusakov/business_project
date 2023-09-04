import {collection, doc, getFirestore, serverTimestamp, setDoc} from "firebase/firestore"
import ListenService from "./listenService"

class QuestionService {
    async createQuestion(fullName: string, phoneNumber: string, question: string) {
        const db = getFirestore()
        const id = doc(collection(getFirestore(), 'id')).id
        const docRef = doc(db, 'questions', id)
        await setDoc(docRef, {
            fullName: fullName,
            phoneNumber: phoneNumber,
            question: question,
            viewed: false,
            timestamp: serverTimestamp()
        })
    }

    getQuestions(setData: {(data: any): void}, setLastVisible: {(data: any): void}) {
        return ListenService.listenDocs(setData, 'questions', 'desc', setLastVisible)
    }
}

export default new QuestionService()