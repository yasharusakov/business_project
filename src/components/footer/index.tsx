import Logo from "../ui/logo"
import Popup from "../popup"
import ShoppingCartPopup from "../popups/shoppingCartPopup"
import CategoriesPopup from "../popups/categoriesPopup"
import Support from "../ui/support"
import SupportPopup from "../popups/supportPopup"
import Notification from "../ui/notification"
import instagram from '../../assets/images/instagram.png'
import payments from '../../assets/images/payments.png'
import './style.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div style={{paddingTop: 30, paddingBottom: 30}} className="footer__container container">
                <div className="footer__column">
                    <Logo/>
                    <div className="footer__pay">
                        <div className="footer__pay-title">Приймаємо до оплати</div>
                        <div className="footer__pay-payments">
                            <img src={payments} alt="payments"/>
                        </div>
                    </div>
                </div>
                <div className="footer__column">
                    <div className="footer__title footer__title">
                        Контактна інформація
                    </div>
                    <div className="footer__contacts">
                        <div className="footer__contact">
                            <div className="footer__contact-icon">
                                <img width={20} height={20} src={instagram} alt="instagram"/>
                            </div>
                            <div className="footer__contact-name">
                                <a tabIndex={0} target="_blank" href="https://www.instagram.com/powerjizer.ua/">powerjizer.ua</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup title="Кошик" name="ShoppingCart" render={() => <ShoppingCartPopup/>}/>
            <Popup title="Каталог" name="CategoriesPopup" render={() => <CategoriesPopup/>}/>
            <Popup title="Технічна підтримка" name="SupportPopup" render={() => <SupportPopup/>}/>
            <Notification/>
            <Support/>
        </footer>
    )
}

export default Footer