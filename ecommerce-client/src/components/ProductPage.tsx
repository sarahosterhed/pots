import { useParams } from "react-router";

export const ProductPage = () => {
    const { id } = useParams();
    return (
        <div>ProductPage {id}</div>
    )
}
