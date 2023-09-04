import {Autoplay, Pagination} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"
import {useEffect, useState} from "react"
import MainSliderService from "../../services/mainSliderService"
import Loader from "../../components/ui/loader"
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

const MainPageSlider = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [slides, setSlides] = useState<{id: string, url: string}[]>([])

    useEffect(() => {
        MainSliderService.getSlides()
            .then(data => {
                setSlides(data as {id: string, url: string}[])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <Loader/>

    return (
        <Swiper
            loop
            autoplay={{delay: 3500}}
            modules={[Pagination, Autoplay]}
            navigation
            slidesPerView={1}
            grabCursor={true}
            pagination={{clickable: true}}
        >
            {slides.map(slide => {
                return (
                    <SwiperSlide key={slide.id}>
                        <img src={slide.url} alt={slide.url}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default MainPageSlider