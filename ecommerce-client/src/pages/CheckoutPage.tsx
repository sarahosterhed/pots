import { useCallback, useContext } from "react"
import CartContext from "../contexts/CartContext"
import { CustomerForm } from "../components/Checkout/CustomerForm"
import CheckoutContext from "../contexts/CheckoutContext"
import { OrderConfirmation } from "../components/Checkout/OrderConfirmation"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const CheckoutPage = () => {
    const { cart } = useContext(CartContext);
    const { checkoutStage } = useContext(CheckoutContext);

    const totalSum = cart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0);


    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await axios.post("http://localhost:3000/stripe/create-checkout-session-embedded");
            return response.data.clientSecret;
        } catch (error) {
            console.error("Error fetching client secret:", error);
            throw error;
        }
    }, [])

    const options = { fetchClientSecret };

    return (
        <div>
            <section>
                <h2>Order Details</h2>
                {cart.map(({ product, quantity }) => (
                    <li key={product.id}><span>{product.name}</span> x <span>{quantity}</span></li>
                ))}
                <h2>Total: {totalSum} :-</h2>
            </section>
            <section>
                {checkoutStage === 1 &&
                    <CustomerForm />
                }
                {checkoutStage === 2 &&
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={options}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                }
                {checkoutStage === 2 &&
                    <OrderConfirmation />
                }
            </section>
        </div>
    )
}
