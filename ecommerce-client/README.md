# Pots — Frontend

**Live site:** [https://plantpots.vercel.app](https://plantpots.vercel.app)

Pots is an e-commerce store for rare and trendy plants, built as a personal learning project. The focus was on building a fully functional shopping experience end-to-end — from browsing products to paying with Stripe — while developing skills in React, TypeScript, and frontend architecture.

This was a learning process, and I'm happy with how it turned out, especially the design of the start page.

## Features

- Browse and search for plants
- View detailed product pages
- Add to cart from both list and detail views
- Cart managed with React Context and Reducers
- Checkout and pay securely with Stripe
- Order confirmation page
- Admin page for managing products, orders, and customers
- Plant search powered by Google Custom Search API

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **React Router** for navigation
- **React Context & Reducers** for cart state
- **Stripe** for payment processing
- **Google Custom Search API** for plant search
- **Vercel** for deployment

## Backend

The frontend connects to a custom REST API built with Node.js, Express, and MySQL. See the `ecommerce-api` folder for the backend code.
