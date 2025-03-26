import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Middleware
app.use(express.json())
app.use(cors())

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { ICheckoutLineItem } from "./models/ICheckout";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)



app.post('/stripe/create-checkout-session-embedded', async (req: Request, res: Response) => {
  const lineItems: ICheckoutLineItem = req.body.lineItems;
  console.log(lineItems)
  const clientReferenceId = req.body.clientReferenceId;
  console.log(clientReferenceId)

  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
          images: ["image-url.com"]
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    // success_url: 'http://localhost:5173/order-confirmation',
    client_reference_id: clientReferenceId,
    return_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}'
  });

  // res.json({ checkoutUrl: session.url, sessionId: session.id, clientReferenceId: session.client_reference_id, session: session })

  res.send({ clientSecret: session.client_secret });

});



app.post("/stripe/webhook", (req: Request, res: Response) => {
  const event = req.body;

  //Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.type.object
      console.log(event.type.object)
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });


})


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
