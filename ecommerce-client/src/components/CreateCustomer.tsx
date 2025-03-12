import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { CustomerCreate } from "../types/Customer"
import { createCustomer, getCustomers } from "../services/customerService";
import { ActionType } from "../reducers/CustomerReducer";
import { CustomerContext } from "../contexts/customerContext";


export const CreateCustomer = () => {
    const [showCreateCustomer, setShowCreateCustomer] = useState(false);
    const { dispatch } = useContext(CustomerContext);
    const [newCustomer, setNewCustomer] = useState<CustomerCreate>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "number") {
            setNewCustomer({ ...newCustomer, [e.target.name]: +e.target.value })
        } else {
            setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createCustomer(newCustomer);
        const updatedCustomers = await getCustomers();
        dispatch({
            type: ActionType.LOADED,
            payload: JSON.stringify(updatedCustomers)
        })

        setShowCreateCustomer(false)
    }

    return (
        <>
            {!showCreateCustomer
                ? <button onClick={() => { setShowCreateCustomer(true) }}>Create Customer</button>
                : (
                    <>
                        <h2>Create Customer</h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input onChange={handleChange} type="text" name="firstname" placeholder="First Name" value={newCustomer.firstname} />
                            <input onChange={handleChange} type="text" name="lastname" placeholder="Last Name" value={newCustomer.lastname} />
                            <input onChange={handleChange} type="email" name="email" placeholder="Email" value={newCustomer.email} />
                            <input onChange={handleChange} type="password" name="password" placeholder="Password" value={newCustomer.password} />
                            <input onChange={handleChange} type="tel" name="phone" placeholder="Phone Number" value={newCustomer.phone} />
                            <input onChange={handleChange} type="text" name="street_address" placeholder="Street Address" value={newCustomer.street_address} />
                            <input onChange={handleChange} type="text" name="postal_code" placeholder="Postal Code" value={newCustomer.postal_code} />
                            <input onChange={handleChange} type="text" name="city" placeholder="City" value={newCustomer.city} />
                            <input onChange={handleChange} type="text" name="country" placeholder="Country" value={newCustomer.country} />
                            <button type="submit">Add Customer</button>
                        </form>
                    </>
                )
            }
        </>
    )
}
