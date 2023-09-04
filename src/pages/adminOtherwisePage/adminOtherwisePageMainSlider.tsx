import {ChangeEvent, useEffect, useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay, Pagination} from "swiper"
import MainSliderService from "../../services/mainSliderService"
import delete_icon from '../../assets/images/delete.png'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
import Loader from "../../components/ui/loader";

const AdminOtherwisePageMainSlider = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])
    const [urls, setUrls] = useState<{id: string, url: string}[]>([])
    const [urls2, setUrls2] = useState<{id: string, url: string}[]>([])
    const [deletedImages, setDeletedImages] = useState<{id: string, url: string}[]>([])

    useEffect(() => {
        MainSliderService.getSlides()
            .then((data) => {
                setUrls2(data as {id: string, url: string}[])
            })
    }, [])


    const onSubmitHandler = async () => {
        setLoading(true)
        const newDeletedImages = deletedImages.filter(item => item.id.length > 3)
        await MainSliderService.createSlides(files, newDeletedImages)
            .finally(() => setLoading(false))
    }

    const createUrl = (files: File[]) => {
        const data = files.map((file, index) => {
            const creator = window.URL || window.webkitURL
            return {id: String(index), url: creator.createObjectURL((file as Blob))}
        })
        setUrls(data)
    }

    const deleteImage = (id: string, url: string, index: number) => {
        setFiles(files => files.filter((item, i) => i !== index))
        setUrls(url => url.filter((item, i) => i !== index))
        setUrls2(urls2 => urls2.filter((item, i) => i !== index))
        setDeletedImages(deletedImages => [{id, url}, ...deletedImages])
    }

    useEffect(() => {
        if (!files.length) return
        createUrl(files)
    }, [files.length])

    return (
        <div className="admin-otherwise-page__main-slider">
            <div className="admin-otherwise-page__main-slider__title">
                Основний слайдер
            </div>
            <Swiper
                loop
                autoplay={{delay: 3500}}
                modules={[Pagination, Autoplay]}
                navigation
                slidesPerView={1}
                grabCursor={true}
                pagination={{clickable: true}}
            >
                {[...urls2, ...urls].map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img src={item.url} alt={item.url}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="admin-otherwise-page__main-slider__slides">
                {[...urls2, ...urls].map((item, index) => {
                    return (
                        <div className="admin-otherwise-page__main-slider__slides__slide">
                            <img key={index} src={item.url} alt={item.url}/>
                            <div onClick={() => deleteImage(item.id, item.url, index)} className="admin-otherwise-page__main-slider__slides__slide__delete">
                                <img src={delete_icon} alt="delete"/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="admin-otherwise-page__main-slider__buttons">
                <button className="admin-otherwise-page__main-slider__add-image">
                    Додати картинку
                    <input multiple onChange={(e: ChangeEvent<HTMLInputElement>) => setFiles(files => [...files, ...e.target.files!])} accept=".jpg,.jpeg,.png" type="file"/>
                </button>
                <button disabled={loading} onClick={onSubmitHandler} className="admin-otherwise-page__main-slider__submit">
                    {loading ? <Loader/> : 'Відправити'}
                </button>
            </div>
        </div>
    )
}

export default AdminOtherwisePageMainSlider