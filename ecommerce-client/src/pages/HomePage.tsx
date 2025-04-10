import { useState } from "react"
import { DisplayProducts } from "../components/Start/DisplayProducts"
import "../styles/pages/HomePage.css"
import { IndexedItem } from "../types/IndexedItem"
import { SearchBar } from "../components/Start/SearchBar"
import { Helmet } from "react-helmet"

export const HomePage = () => {
    const [filteredProducts, setFilteredProducts] = useState<IndexedItem[]>([]);
    return (
        <>
            <Helmet >
                <title>Home | Pots</title>
                <meta name="google-site-verification" content="V2tsYfrsOglRaB88LJ17QZ4EXtwie1sWWCB74CQJFv8" />
                <meta property="og:title" content="Pots | Grow your vibe" />
                <meta name="description" content="Discover beautiful and rare indoor plants for your home. Shop now at Pots – your green space begins here." />
                <meta property="og:type" content="website" />
            </Helmet>
            <SearchBar setFilteredProducts={setFilteredProducts} />
            <DisplayProducts filteredProducts={filteredProducts} />
        </>
    )
}
