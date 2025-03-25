
import { CheckoutPayload } from "../types/Checkout";

const CHECKOUT_URL = "http://localhost:3000/stripe/create-checkout-session/"

export const createCheckoutSession = async (payload: CheckoutPayload) => {
  try {
    const response = await fetch(CHECKOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lineItems: payload.lineItems, clientReferenceId: payload.clientReferenceId })

    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
