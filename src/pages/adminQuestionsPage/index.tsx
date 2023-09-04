import {useEffect, useState} from "react"
import Question from "./question"
import QuestionService from "../../services/questionService"
import UtilsService from "../../services/utilsService"
import './style.scss'

const AdminQuestionsPage = () => {
    const [questions, setQuestions] = useState<any[]>([])
    const [lastVisible, setLastVisible] = useState<any>()
    const [lastVisibleDoc, setLastVisibleDoc] = useState<any>()

    useEffect(() => {
        const unsub = QuestionService.getQuestions(setQuestions, setLastVisible)
        if (!unsub) return
        return () => unsub()
    }, [])

    return (
        <div className="admin-questions-page">
            <div className="admin-questions-page__container">
                {questions.map(question => <Question key={question.id} {...question} />)}
            </div>
            <button className="load" onClick={() => UtilsService.nextData('questions', setQuestions, setLastVisibleDoc, lastVisible, lastVisibleDoc)}>Load</button>
        </div>
    )
}

export default AdminQuestionsPage