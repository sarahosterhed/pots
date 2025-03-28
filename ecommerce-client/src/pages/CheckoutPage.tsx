import { useContext } from "react"
import { CustomerForm } from "../components/Checkout/CustomerForm"
import CheckoutContext from "../contexts/CheckoutContext"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getFromLocalStorage } from "../utils/localStorageUtils"
import "../styles/pages/CheckoutPage.css"


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const CheckoutPage = () => {
    const { checkoutStage } = useContext(CheckoutContext);

    const clientSecret = getFromLocalStorage("clientSecret")

    return (
        <div className="checkout-page">
            <section>
                {checkoutStage === 1 &&
                    <CustomerForm />
                }
                {checkoutStage === 2 &&
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={clientSecret}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                }
            </section>
        </div>
    )
}
