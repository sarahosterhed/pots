import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Customer } from "../../types/Customer";
import { useCustomers } from "../../hooks/useCustomers";
import { OrderCreate } from "../../types/Order";
import CartContext from "../../contexts/CartContext";
import { fetchCustomerByEmail } from "../../services/customerService";

export const CustomerForm = () => {
    const [customerInput, setCustomerInput] = useState<Customer>({
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
        created_at: ""
    });
    const [order, setOrder] = useState<OrderCreate>({
        customer_id: 0,
        payment_status: "",
        payment_id: "",
        order_status: "",
        order_items: []
    });
    const { cart, cartQuantity } = useContext(CartContext)

    const { fetchCustomerByEmailHandler, createCustomerHandler } = useCustomers();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { type, name, value } = e.target;
        if (type !== "tel") {
            setCustomerInput({ ...customerInput, [name]: value })
        } else {
            setCustomerInput({ ...customerInput, [name]: +value })
        }
        console.log("Customer Input", customerInput)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const customer = await fetchCustomerByEmail(customerInput.email);

        if (customer !== null) {
            console.log("customer found", customer.id)
            setOrder({
                ...order,
                customer_id: customer.id,
                payment_status: "Unpaid",
                payment_id: "",
                order_status: "Pending",
                // order_items:
            })
            console.log(order)
        } else {
            const response = await createCustomerHandler(customerInput);
            console.log("response", response)

        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" onChange={(e) => handleChange(e)} value={customerInput.firstname} />
            <input type="text" name="lastname" onChange={(e) => handleChange(e)} value={customerInput.lastname} />
            <input type="email" name="email" onChange={(e) => handleChange(e)} value={customerInput.email} />
            <input type="password" name="password" onChange={(e) => handleChange(e)} value={customerInput.password} />
            <input type="tel" name="phone" onChange={(e) => handleChange(e)} value={customerInput.phone} />
            <input type="text" name="street_address" onChange={(e) => handleChange(e)} value={customerInput.street_address} />
            <input type="text" name="postal_code" pattern="[0-9]{5}" onChange={(e) => handleChange(e)} value={customerInput.postal_code} />
            <input type="text" name="city" onChange={(e) => handleChange(e)} value={customerInput.city} />
            <input type="text" name="country" onChange={(e) => handleChange(e)} value={customerInput.country} />

            <button type="submit">Go to payment</button>
        </form>
    )
}
