import Accordion from "../../components/ui/accordion"
import {FC, useEffect, useState} from "react"
import {IQuestion} from "../../types/IQuestion"
import ViewService from "../../services/viewService"

const Question: FC<IQuestion> = ({id, fullName, phoneNumber, question, timestamp}) => {
    const [viewed, setViewed] = useState<boolean>(false)

    useEffect(() => {
        const unsub = ViewService.checkViewed(setViewed, `questions/${id}`)

        if (!unsub) return

        return () => {
            unsub()
        }
    }, [])

    return (
        <div className="admin-questions-page__question">
            <Accordion render={() => (
                <div className="admin-questions-page__question__container">
                    <div className="admin-questions-page__question__data">
                        <div className="admin-questions-page__question__full-name">{fullName}</div>
                        <div className="admin-questions-page__question__phone-number">{phoneNumber}</div>
                    </div>
                    <div className="admin-questions-page__question__additional-data">
                        <div className="admin-questions-page__question__additional-data__timestamp">{new Date(timestamp.seconds * 1000).toLocaleString()}</div>
                        <div className="admin-questions-page__question__additional-data__viewed">
                            {viewed ? <div>Переглянуто</div> : <button onClick={() => ViewService.updateViewed(`questions/${id}`)} >Переглянути</button>}
                        </div>
                    </div>
                </div>
            )}>
                <div className="admin-questions-page__question__question">{question}</div>
            </Accordion>
        </div>
    )
}

export default Question