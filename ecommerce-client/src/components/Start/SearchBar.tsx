import axios from "axios";
import { ChangeEvent, useState } from "react"
import { IndexedItem } from "../../types/IndexedItem";

type SearchBarProps = {
    setFilteredProducts: (items: IndexedItem[]) => void;
}

export const SearchBar = ({ setFilteredProducts }: SearchBarProps) => {
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState<string>("");

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value)

        if (value.length < 2) {
            setFilteredProducts([]);
            return;
        }

        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    q: searchText,
                    key: import.meta.env.VITE_GOOGLE_API_KEY,
                    cx: import.meta.env.VITE_SEARCHENGINE_ID
                }
            })
            console.log(response.data)

            if (response.data.items === undefined) {
                throw new Error('No search results')
            }

            const filteredProducts = response.data.items.filter((item: IndexedItem) => (
                item.title.toLowerCase().includes(value.toLowerCase())
            ))

            setFilteredProducts(filteredProducts);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                setError(error.message)
            }
        }

    }

    // const filteredItems: IndexedItem[] = [
    //     {
    //         displayLink: "www.lindex.com",
    //         formattedUrl: "https://www.lindex.com/se/p/rosa-trosa-12345678",
    //         htmlFormattedUrl: "https://www.lindex.com/se/p/<b>rosa</b>-trosa-12345678",
    //         htmlSnippet: "En bekväm och mjuk <b>rosa</b> trosa i bomull.",
    //         htmlTitle: "<b>Rosa trosa</b> – Underkläder – Lindex",
    //         kind: "customsearch#result",
    //         link: "https://www.lindex.com/se/p/rosa-trosa-12345678",
    //         snippet: "En bekväm och mjuk rosa trosa i bomull.",
    //         pagemap: {
    //             cse_thumbnail: [
    //                 {
    //                     src: "https://images.lindex.com/product1-thumb.jpg",
    //                     width: "200",
    //                     height: "200",
    //                 },
    //             ],
    //         },
    //         title: "Rosa trosa – Underkläder – Lindex",
    //     },
    //     {
    //         displayLink: "www.lindex.com",
    //         formattedUrl: "https://www.lindex.com/se/p/svart-bh-23456789",
    //         htmlFormattedUrl: "https://www.lindex.com/se/p/<b>svart</b>-bh-23456789",
    //         htmlSnippet: "Elegant <b>svart</b> bh med spetsdetaljer.",
    //         htmlTitle: "<b>Svart BH</b> – Underkläder – Lindex",
    //         kind: "customsearch#result",
    //         link: "https://www.lindex.com/se/p/svart-bh-23456789",
    //         snippet: "Elegant svart bh med spetsdetaljer.",
    //         pagemap: {
    //             cse_thumbnail: [
    //                 {
    //                     src: "https://images.lindex.com/product2-thumb.jpg",
    //                     width: "200",
    //                     height: "200",
    //                 },
    //             ],
    //         },
    //         title: "Svart BH – Underkläder – Lindex",
    //     },
    //     {
    //         displayLink: "www.lindex.com",
    //         formattedUrl: "https://www.lindex.com/se/p/blommiga-pyjamasbyxor-34567890",
    //         htmlFormattedUrl: "https://www.lindex.com/se/p/<b>blommiga</b>-pyjamasbyxor-34567890",
    //         htmlSnippet: "Mjuka <b>blommiga</b> pyjamasbyxor i ekologisk bomull.",
    //         htmlTitle: "<b>Blommiga Pyjamasbyxor</b> – Nattkläder – Lindex",
    //         kind: "customsearch#result",
    //         link: "https://www.lindex.com/se/p/blommiga-pyjamasbyxor-34567890",
    //         snippet: "Mjuka blommiga pyjamasbyxor i ekologisk bomull.",
    //         pagemap: {
    //             cse_thumbnail: [
    //                 {
    //                     src: "https://images.lindex.com/product3-thumb.jpg",
    //                     width: "200",
    //                     height: "200",
    //                 },
    //             ],
    //         },
    //         title: "Blommiga Pyjamasbyxor – Nattkläder – Lindex",
    //     },
    //     {
    //         displayLink: "www.lindex.com",
    //         formattedUrl: "https://www.lindex.com/se/p/vit-topp-45678901",
    //         htmlFormattedUrl: "https://www.lindex.com/se/p/<b>vit</b>-topp-45678901",
    //         htmlSnippet: "En klassisk <b>vit</b> topp med rund hals.",
    //         htmlTitle: "<b>Vit Topp</b> – Basplagg – Lindex",
    //         kind: "customsearch#result",
    //         link: "https://www.lindex.com/se/p/vit-topp-45678901",
    //         snippet: "En klassisk vit topp med rund hals.",
    //         pagemap: {
    //             cse_thumbnail: [
    //                 {
    //                     src: "https://images.lindex.com/product4-thumb.jpg",
    //                     width: "200",
    //                     height: "200",
    //                 },
    //             ],
    //         },
    //         title: "Vit Topp – Basplagg – Lindex",
    //     },
    //     {
    //         displayLink: "www.lindex.com",
    //         formattedUrl: "https://www.lindex.com/se/p/marinbla-badrock-56789012",
    //         htmlFormattedUrl: "https://www.lindex.com/se/p/<b>marinblå</b>-badrock-56789012",
    //         htmlSnippet: "Mysig <b>marinblå</b> badrock för barn med huva.",
    //         htmlTitle: "<b>Marinblå Badrock</b> – Barn – Lindex",
    //         kind: "customsearch#result",
    //         link: "https://www.lindex.com/se/p/marinbla-badrock-56789012",
    //         snippet: "Mysig marinblå badrock för barn med huva.",
    //         pagemap: {
    //             cse_thumbnail: [
    //                 {
    //                     src: "https://images.lindex.com/product5-thumb.jpg",
    //                     width: "200",
    //                     height: "200",
    //                 },
    //             ],
    //         },
    //         title: "Marinblå Badrock – Barn – Lindex",
    //     },
    // ];



    return (
        <>
            <input
                type="search"
                placeholder="search products"
                onChange={(e) => handleSearch(e)} />
            {/* <button onClick={handleSearch}>Search</button> */}
            {error && <p>{error}</p>}
        </>
    )
}
