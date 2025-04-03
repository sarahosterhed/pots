import { CheckoutPayload } from "../types/Checkout";
const CHECKOUT_URL = "https://knodd-2l1j33ljg-sarahs-projects-a65c68a0.vercel.app/stripe/";
// const CHECKOUT_URL = "http://localhost:3000/stripe/";

export const getClientSecret = async ({ orderId, lineItems }: CheckoutPayload) => {
  try {
    const response = await fetch(`${CHECKOUT_URL}create-checkout-session-embedded`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: lineItems,
        customer_id: orderId
      }),
    });

    const clientSecret = await response.json();
    return clientSecret;
  } catch (error) {
    console.error("Error fetching clientSecret:", error);
    return null;
  }
};

export const updateOrderInCheckout = async ({ orderId, orderedProducts }: CheckoutPayload) => {
  try {
    const response = await fetch(`${CHECKOUT_URL}webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
        orderedProducts: orderedProducts
      }),
    });

    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
}
