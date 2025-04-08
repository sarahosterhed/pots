import { SearchBar } from "../components/SearchBar"
import { DisplayProducts } from "../components/Start/DisplayProducts"
import "../styles/pages/HomePage.css"

export const HomePage = () => {
    return (
        <>
            <SearchBar />
            <DisplayProducts />
        </>
    )
}
