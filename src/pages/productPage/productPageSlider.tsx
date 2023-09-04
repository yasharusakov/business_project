import {Pagination} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"
import {IProduct} from "../../types/IProduct"
import {FC, memo, useState} from "react"
import {Swiper as SwiperType} from "swiper/types"
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

interface ProductPageSliderProps {
    product: IProduct
    characteristics?: boolean
}

const ProductPageSlider: FC<ProductPageSliderProps> = memo(({product, characteristics}) => {
    const [swiper, setSwiper] = useState<SwiperType>()

    return (
        <div className={`slides ${characteristics ? 'characteristics': ''}`}>
            <div className="slides__choose">
                {[{url: product.url, id: product.id}, ...product.images].map((image, index) => {
                    return (
                        <div key={image.id} onClick={() => swiper?.slideTo(index + 1)} className={`slides__choose__item ${characteristics ? 'characteristics' : ''}`}>
                            <img src={image.url} alt={image.id}/>
                        </div>
                    )
                })}
            </div>
            <Swiper
                loop
                modules={[Pagination]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                grabCursor={true}
                pagination={{clickable: true}}
                onSwiper={setSwiper}
            >
                <SwiperSlide>
                    <img src={product.url} alt={product.id}/>
                </SwiperSlide>
                {product.images.map(image => {
                    return (
                        <SwiperSlide key={image.id}>
                            <img src={image.url} alt={image.id}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
})

export default ProductPageSlider