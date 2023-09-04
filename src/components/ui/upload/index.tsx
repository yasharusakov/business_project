import {ChangeEvent, DragEvent, FC, memo, useEffect, useState} from "react"
import drag_and_drop from '../../../assets/images/drag-and-drop.png'
import './style.scss'

interface UploadProps {
    setFile: { (file: File | null): void }
    setUrl: { (url: string): void }
    file: File | null
}

const Upload: FC<UploadProps> = memo(({setFile, setUrl, file}) => {
    const [drag, setDrag] = useState<boolean>(false)

    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    }

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        setFile(file)
        setDrag(false)
    }

    const createUrl = (file: File) => {
        const creator = window.URL || window.webkitURL
        const url = creator.createObjectURL((file as Blob))
        setUrl(url)
    }

    useEffect(() => {
        if (!file) return
        createUrl(file)
    }, [file])

    return (
        <div className="upload">
            <div onDragStart={onDragStart} onDragLeave={onDragLeave} onDragOver={onDragStart} onDrop={onDrop} className={drag ? "upload-drag drag-active" : "upload-drag" }></div>
            <img width={64} height={64} src={drag_and_drop} alt="drag_and_drop"/>
            <div className="upload__title">Перетащіть сюди фото</div>
            <button className="upload__button">
                Вибрати фото
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])}  type="file" accept=".jpg,.jpeg,.png"/>
            </button>
        </div>
    )
})

export default Upload