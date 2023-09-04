import MainPageSlider from "./mainPageSlider"
import MainPageCategories from "./mainPageCategories"
import wallet from '../../assets/images/wallet.png'
import delivery from '../../assets/images/delivery.png'
import warranty from '../../assets/images/warranty.png'
import './style.scss'

const MainPage = () => {
    const aboutItems = [
        {title: 'Оплата при отриманні', url: wallet},
        {title: 'Доставка з Європи', url: delivery},
        {title: 'Гарантія якості', url: warranty}
    ]

    return (
        <div className="main-page">
            <div className="main-page__container">
                <MainPageSlider/>
                <div style={{paddingTop: 50, paddingBottom: 50}} className="main-page__info container">
                    <div className="main-page__about-products-row">
                        {aboutItems.map((item, index) => {
                            return (
                                <div key={index} className="main-page__about-products-item">
                                    <div className="main-page__about-products-picture">
                                        <img src={item.url} alt={item.title} width={64} height={64}/>
                                    </div>
                                    <div className="main-page__about-products-title">
                                        {item.title}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="main-page__categories-title">
                        Категорії товарів
                    </div>
                    <MainPageCategories/>
                </div>
            </div>
        </div>
    )
}

export default MainPage