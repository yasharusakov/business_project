import {FC, memo} from "react"
import {IProductCharacteristic} from "../../types/IProductCharacteristic"

interface ProductPageCharacteristicsProps {
    productCharacteristics: IProductCharacteristic[]
}

const ProductPageCharacteristics: FC<ProductPageCharacteristicsProps> = memo(({productCharacteristics}) => {
    return (
        <div className="product-page__column">
            <div className="product-page__characteristics">
                {productCharacteristics?.map(characteristic => (
                    <div key={characteristic.id} className="product-page__characteristic">
                        <div className="product-page__characteristic__title">{characteristic.title}</div>
                        <div className="product-page__characteristic__text">{characteristic.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default ProductPageCharacteristics