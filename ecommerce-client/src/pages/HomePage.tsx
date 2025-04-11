import { useState } from "react"
import { DisplayProducts } from "../components/Start/DisplayProducts"
import "../styles/pages/HomePage.css"
import { IndexedItem } from "../types/IndexedItem"
import { SearchBar } from "../components/Start/SearchBar"

export const HomePage = () => {
    const [filteredProducts, setFilteredProducts] = useState<IndexedItem[]>([]);
    console.log('filteredProducts:', filteredProducts)

    // const mockFilteredProducts: IndexedItem[] = [
    //     {
    //         displayLink: "plantpots.vercel.app",
    //         formattedUrl: "https://plantpots.vercel.app/products/monstera",
    //         htmlFormattedUrl: "https://plantpots.vercel.app/products/monstera",
    //         htmlSnippet: "Monstera Deliciosa is a tropical plant known for its large, split leaves.",
    //         htmlTitle: "Monstera Deliciosa | Plant Pots",
    //         kind: "customsearch#result",
    //         link: "https://plantpots.vercel.app/products/monstera",
    //         snippet: "Monstera Deliciosa is a tropical plant known for its large, split leaves.",
    //         pagemap: {
    //             cse_image: [
    //                 {
    //                     src: "/src/assets/images/monstera.jpg",
    //                     width: "300",
    //                     height: "300"
    //                 }
    //             ]
    //         },
    //         title: "Monstera Deliciosa"
    //     },
    //     {
    //         displayLink: "plantpots.vercel.app",
    //         formattedUrl: "https://plantpots.vercel.app/products/alocasia",
    //         htmlFormattedUrl: "https://plantpots.vercel.app/products/alocasia",
    //         htmlSnippet: "Alocasia Macrorrhiza, or Giant Elephant Ear, thrives in bright, indirect light.",
    //         htmlTitle: "Alocasia Macrorrhiza | Plant Pots",
    //         kind: "customsearch#result",
    //         link: "https://plantpots.vercel.app/products/alocasia",
    //         snippet: "Alocasia Macrorrhiza, or Giant Elephant Ear, thrives in bright, indirect light.",
    //         pagemap: {
    //             cse_image: [
    //                 {
    //                     src: "/src/assets/images/alocasia.jpg",
    //                     width: "300",
    //                     height: "300"
    //                 }
    //             ]
    //         },
    //         title: "Alocasia Macrorrhiza"
    //     },
    //     {
    //         displayLink: "plantpots.vercel.app",
    //         formattedUrl: "https://plantpots.vercel.app/products/fiddle-leaf",
    //         htmlFormattedUrl: "https://plantpots.vercel.app/products/fiddle-leaf",
    //         htmlSnippet: "Aphelandra White Wash features dark green leaves with white variegation and produces striking yellow flowers. It thrives in warm, humid environments with indirect light.",
    //         htmlTitle: "Fiddle Leaf Fig | Plant Pots",
    //         kind: "customsearch#result",
    //         link: "https://plantpots.vercel.app/products/fiddle-leaf",
    //         snippet: "Aphelandra White Wash features dark green leaves with white variegation and produces striking yellow flowers. It thrives in warm, humid environments with indirect light.",
    //         pagemap: {
    //             cse_image: [
    //                 {
    //                     src: "/src/assets/images/fiddle.jpg",
    //                     width: "300",
    //                     height: "300"
    //                 }
    //             ]
    //         },
    //         title: "Aphelandra White Wash"
    //     },
    //     {
    //         displayLink: "plantpots.vercel.app",
    //         formattedUrl: "https://plantpots.vercel.app/products/pilea",
    //         htmlFormattedUrl: "https://plantpots.vercel.app/products/pilea",
    //         htmlSnippet: "Pilea Peperomioides is also called the Chinese Money Plant — easy to care for.",
    //         htmlTitle: "Pilea Peperomioides | Plant Pots",
    //         kind: "customsearch#result",
    //         link: "https://plantpots.vercel.app/products/pilea",
    //         snippet: "Pilea Peperomioides is also called the Chinese Money Plant — easy to care for.",
    //         pagemap: {
    //             cse_image: [
    //                 {
    //                     src: "/src/assets/images/pilea.jpg",
    //                     width: "300",
    //                     height: "300"
    //                 }
    //             ]
    //         },
    //         title: "Pilea Peperomioides"
    //     },
    // ];



    return (
        <>
            <SearchBar setFilteredProducts={setFilteredProducts} />
            <DisplayProducts filteredProducts={filteredProducts} />
            {/* <DisplayProducts filteredProducts={filteredProducts} /> */}
        </>
    )
}
