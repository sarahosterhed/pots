import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Middleware
const cors = require('cors');
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



app.post('/stripe/create-checkout-session', async (req: Request, res: Response) => {
  const lineItems: ICheckoutLineItem = req.body.lineItems;
  console.log(lineItems)
  const clientReferenceId = req.body.clientReferenceId;
  console.log(clientReferenceId)

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/order-confirmation',
    cancel_url: 'http://localhost:5173/checkout',
    client_reference_id: clientReferenceId
  });

  res.json({ checkoutUrl: session.url, sessionId: session.id, clientReferenceId: session.client_reference_id, session: session })

  // res.redirect(303, session.url);
});

// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
