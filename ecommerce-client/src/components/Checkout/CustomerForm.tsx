import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Customer } from "../../types/Customer";
import { useCustomers } from "../../hooks/useCustomers";
import { useOrders } from "../../hooks/useOrders";
import { getFromLocalStorage, saveTolocalStorage } from "../../utils/localStorageUtils";
import { useCheckout } from "../../hooks/useCheckout";

export const CustomerForm = () => {
    const storedCustomerInput = getFromLocalStorage('customerInput');
    const [customerInput, setCustomerInput] = useState<Customer>(storedCustomerInput || {
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
    const { fetchCustomerByEmailHandler, createCustomerHandler } = useCustomers();
    const { createOrderHandler, prepareOrderHandler, updateOrderHandler } = useOrders();
    const { createCheckoutHandler, prepareCheckoutPayloadHandler, checkoutCleanupHandler } = useCheckout();

    useEffect(() => {
        saveTolocalStorage("customerInput", customerInput);
    }, [customerInput]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { type, name, value } = e.target;
        if (type !== "tel") {
            setCustomerInput({ ...customerInput, [name]: value })
        } else {
            setCustomerInput({ ...customerInput, [name]: +value })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            let customer = await fetchCustomerByEmailHandler(customerInput.email);
            if (!customer) {
                customer = await createCustomerHandler(customerInput);
            }

            const { id } = customer;
            const newOrder = prepareOrderHandler(id);
            const orderResponse = await createOrderHandler(newOrder);
            const orderId: number = orderResponse.id;

            const checkoutPayload = prepareCheckoutPayloadHandler(newOrder);
            const { checkoutUrl, sessionId } = await createCheckoutHandler(checkoutPayload);

            saveTolocalStorage("paymentId", sessionId)
            window.location.href = checkoutUrl;

            await updateOrderHandler(orderId, {
                "payment_status": "paid",
                "payment_id": sessionId,
                "order_status": "Recieved"
            });

            checkoutCleanupHandler();

        } catch (error) {
            console.error("Checkout process failed:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder="First Name" onChange={(e) => handleChange(e)} value={customerInput.firstname} />
            <input type="text" name="lastname" placeholder="Last Name" onChange={(e) => handleChange(e)} value={customerInput.lastname} />
            <input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e)} value={customerInput.email} />
            <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} value={customerInput.password} />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={(e) => handleChange(e)} value={customerInput.phone} />
            <input type="text" name="street_address" placeholder="Street Address" onChange={(e) => handleChange(e)} value={customerInput.street_address} />
            <input type="text" name="postal_code" placeholder="Postal Code" pattern="[0-9]{5}" onChange={(e) => handleChange(e)} value={customerInput.postal_code} />
            <input type="text" name="city" placeholder="City" onChange={(e) => handleChange(e)} value={customerInput.city} />
            <input type="text" name="country" placeholder="Country" onChange={(e) => handleChange(e)} value={customerInput.country} />

            <button type="submit">Go to payment</button>
        </form>
    )
}
