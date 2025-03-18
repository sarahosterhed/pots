import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { updateCustomer } from "../../services/customerService";
import { Customer } from "../../types/Customer";
import CustomerContext from "../../contexts/CustomerContext";



type UpdateCustomerProps = {
    customerId: number;
    setEditingCustomerId: (id: number | null) => void;
}

export const UpdateCustomer = ({ customerId, setEditingCustomerId }: UpdateCustomerProps) => {
    const { fetchCustomerByIdHandler } = useCustomers()
    const { dispatch } = useContext(CustomerContext);
    const [customer, setCustomer] = useState<Customer>({
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
        created_at: "",
    })


    useEffect(() => {
        const getCustomer = async () => {
            const data = await fetchCustomerByIdHandler(customerId)
            setCustomer(data);
        }
        getCustomer();
    }, [customerId])

    const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEditingCustomerId(null);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "number") {
            setCustomer({ ...customer, [e.target.name]: +e.target.value })
        } else {
            setCustomer({ ...customer, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await updateCustomer(customerId, customer);
        dispatch({
            type: ActionType.UPDATED,
            payload: JSON.stringify(customer)
        })
        setEditingCustomerId(null);
    }

    return (
        <>
            <h2>Update Customer</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={handleChange} type="text" name="firstname" placeholder="First Name" defaultValue={customer.firstname} />
                <input onChange={handleChange} type="text" name="lastname" placeholder="Last Name" defaultValue={customer.lastname} />
                <input onChange={handleChange} type="email" name="email" placeholder="Email" defaultValue={customer.email} />
                <input onChange={handleChange} type="password" name="password" placeholder="Password" defaultValue={customer.password} />
                <input onChange={handleChange} type="tel" name="phone" placeholder="Phone Number" defaultValue={customer.phone} />
                <input onChange={handleChange} type="text" name="street_address" placeholder="Street Address" defaultValue={customer.street_address} />
                <input onChange={handleChange} type="text" name="postal_code" placeholder="Postal Code" defaultValue={customer.postal_code} />
                <input onChange={handleChange} type="text" name="city" placeholder="City" defaultValue={customer.city} />
                <input onChange={handleChange} type="text" name="country" placeholder="Country" defaultValue={customer.country} />
                <button onClick={(e) => { handleBackClick(e) }}>Back</button>
                <button type="submit">Update Customer</button>
            </form>
        </>
    )
}
