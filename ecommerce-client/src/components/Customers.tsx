import { useEffect, useReducer, useState } from "react"
import { deleteCustomer, getCustomers } from "../services/customerService"
import { CustomerContext } from "../contexts/customerContext"
import { ActionType, CustomerReducer } from "../reducers/CustomerReducer"
import { EditCustomer } from "./EditCustomer"
// import { Customer } from "../types/Customer"
import { CreateCustomer } from "./CreateCustomer"

export const Customers = () => {
    const [customers, dispatch] = useReducer(CustomerReducer, []);
    // const [customer, setCustomer] = useState<Customer | null>(null)

    useEffect(() => {
        const getData = async () => {

            const customersData = await getCustomers();
            dispatch({
                type: ActionType.LOADED,
                payload: JSON.stringify(customersData)
            })
        }
        if (customers.length > 0) return;
        getData();
    })

    const handleDelete = async (id: number) => {
        await deleteCustomer(id);
        dispatch({
            type: ActionType.DELETED,
            payload: JSON.stringify(id)
        })
    }

    return (
        <CustomerContext.Provider value={{ customers, dispatch }}>
            <CreateCustomer />
            <section>
                {customers.map(({ id, firstname, lastname, city }) => {
                    return (
                        <div key={id} className="customer-wrapper">
                            <h3>{firstname} {lastname}</h3>
                            <p>{city}</p>
                            <div className="button-wrapper">
                                <EditCustomer customerId={id} />
                                <button onClick={() => handleDelete(id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </section>
        </CustomerContext.Provider>
    )
}
