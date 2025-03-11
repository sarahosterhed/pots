import { useEffect } from "react"
import { getCustomers } from "../services/CustomerService"

export const Customers = () => {

    useEffect(() => {
        const getCust = async () => {
            getCustomers()

        }
        getCust()
    }, [])


    return (
        <>


        </>
    )
}
