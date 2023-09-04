export interface IProduct {
    id: string
    url: string
    title: string
    price: number
    images: {id: string, url: string}[]
    characteristics: string
}