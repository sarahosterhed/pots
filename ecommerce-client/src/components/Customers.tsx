import { useEffect, useState } from "react"
import { deleteCustomer, getCustomer, getCustomers } from "../services/customerService"
import { Customer } from "../types/Customer"

export const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([])

    useEffect(() => {
        getCustomers().then((data) => setCustomers(data))
        getCustomer(1).then()
    }, [])

    const handleDelete = async (id: number) => {
        await deleteCustomer(id);
        setCustomers(customers.filter((customer) => customer.id !== id))
    }

    return (
        <>
            <section>
                {customers.map(({ id, firstname, lastname, city }) => {
                    return (
                        <div key={id} className="customer-wrapper">
                            <h3>{firstname} {lastname}</h3>
                            <p>{city}</p>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(id)}>Delete</button>
                        </div>
                    )
                })}
            </section>

        </>
    )
}
