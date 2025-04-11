import axios from "axios";
import { useState } from "react"
import { IndexedItem } from "../../types/IndexedItem";

type SearchBarProps = {
    setFilteredProducts: (items: IndexedItem[]) => void;
}

export const SearchBar = ({ setFilteredProducts }: SearchBarProps) => {
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState<string>("");

    const handleSearch = async () => {

        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchText,
                    key: import.meta.env.VITE_GOOGLE_API_KEY,
                    cx: import.meta.env.VITE_SEARCHENGINE_ID
                }
            })
            console.log(response.data)

            if (searchText.length <= 3) {
                throw new Error('Must type more than 3 chars')
            }

            if (response.data.items === undefined) {
                throw new Error('No search results')
            }

            const filteredProducts = response.data.items.filter((item: IndexedItem) => (
                item.title.toLowerCase().includes(searchText.toLowerCase())
            ))

            setFilteredProducts(filteredProducts);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                setError(error.message)
            }
        }

    }


    return (
        <>
            <input
                type="search"
                placeholder="search products"
                onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
        </>
    )
}
