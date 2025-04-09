import axios from "axios";
import { useState } from "react"
import { IndexedItem } from "../types/IndexedItem";

export const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [items, setItems] = useState<IndexedItem[] | null>(null);
    const [error, setError] = useState<string>("");

    const handleSearch = async () => {

        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchText,
                    key: 'AIzaSyChOG0unddNjYVLj5r_dSlTADxPdnKOfQs',
                    cx: '05bfd68f9b952446a'
                }
            })
            console.log(response.data)
            if (searchText.length <= 3) {
                throw new Error('Must type more than 3 chars')
            }
            if (response.data.items === undefined) {
                throw new Error('No search results')
            }
            setItems(response.data.items)
            console.log(items)
            console.log(error)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                setError(error.message)
            }
            console.log(error)
        }

    }


    return (
        <>
            <input
                type="search"
                placeholder="search products"
                onChange={(e) => { setSearchText(e.target.value) }} />
            <button onClick={handleSearch}>Search</button>
        </>
    )
}
