import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { CustomerContext } from "../contexts/customerContext";
import { Customer, CustomerEdit } from "../types/Customer";
import { createCustomer, editCustomer, getCustomer, getCustomers } from "../services/customerService";
import { ActionType } from "../reducers/CustomerReducer";


type ShowProps = {
    customerId: number;
}

export const EditCustomer = ({ customerId }: ShowProps) => {
    const [showEditCustomer, setShowEditCustomer] = useState(false);
    const { customers, dispatch } = useContext(CustomerContext);
    const [customerToEdit, setCustomerToEdit] = useState<Customer>()
    const [editedCustomer, setEditedCustomer] = useState<CustomerEdit>({
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


    const handleEditCustomer = async () => {
        const data = await getCustomer(customerId)
        setCustomerToEdit(data);
        setShowEditCustomer(true);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "number") {
            setEditedCustomer({ ...editedCustomer, [e.target.name]: +e.target.value })
        } else {
            setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await editCustomer(customerId, editedCustomer);
        const updatedCustomers = await getCustomers();
        dispatch({
            type: ActionType.LOADED,
            payload: JSON.stringify(updatedCustomers)
        })

        setShowEditCustomer(false)
    }


    return (
        <>
            {!showEditCustomer
                ? <button onClick={() => { handleEditCustomer() }}>Edit</button>
                :
                (<>
                    <h2>Create Customer</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input onChange={handleChange} type="text" name="firstname" placeholder="First Name" defaultValue={customerToEdit?.firstname} />
                        <input onChange={handleChange} type="text" name="lastname" placeholder="Last Name" defaultValue={customerToEdit?.lastname} />
                        <input onChange={handleChange} type="email" name="email" placeholder="Email" defaultValue={customerToEdit?.email} />
                        <input onChange={handleChange} type="password" name="password" placeholder="Password" defaultValue={customerToEdit?.password} />
                        <input onChange={handleChange} type="tel" name="phone" placeholder="Phone Number" defaultValue={customerToEdit?.phone} />
                        <input onChange={handleChange} type="text" name="street_address" placeholder="Street Address" defaultValue={customerToEdit?.street_address} />
                        <input onChange={handleChange} type="text" name="postal_code" placeholder="Postal Code" defaultValue={customerToEdit?.postal_code} />
                        <input onChange={handleChange} type="text" name="city" placeholder="City" defaultValue={customerToEdit?.city} />
                        <input onChange={handleChange} type="text" name="country" placeholder="Country" defaultValue={customerToEdit?.country} />
                        <button type="submit">Update Customer</button>
                    </form>
                </>
                )
            }

        </>
    )
}
