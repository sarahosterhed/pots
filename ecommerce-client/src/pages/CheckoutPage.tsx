import { useContext } from "react"
import CartContext from "../contexts/CartContext"
import { CustomerForm } from "../components/Checkout/CustomerForm"
import CheckoutContext from "../contexts/CheckoutContext"
import { OrderConfirmation } from "../components/Checkout/OrderConfirmation"

export const CheckoutPage = () => {
    const { cart } = useContext(CartContext);
    const { checkoutStage } = useContext(CheckoutContext);

    const totalSum = cart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0)

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
                    <p>teststage 2</p>
                }
                {checkoutStage === 3 &&
                    <OrderConfirmation />
                }
            </section>
        </div>
    )
}
