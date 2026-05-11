# Pots

**Live site:** [https://plantpots.vercel.app](https://plantpots.vercel.app)

Pots is an e-commerce store for rare and trendy plants, built as a personal learning project. The goal was to build a fully functional shopping experience end-to-end — from browsing products to paying with Stripe. I'm particularly happy with how the design of the start page turned out.

## Frontend

Built from scratch with React and TypeScript.

**Features:**
- Browse and search for plants
- View detailed product pages
- Add to cart from both list and detail views
- Cart managed with React Context and Reducers
- Checkout and pay securely with Stripe
- Order confirmation page
- Admin page for managing products, orders, and customers
- Plant search powered by Google Custom Search API

**Tech stack:** React, TypeScript, Vite, React Router, Vercel

## Backend

The REST API was provided as part of the project and I made adjustments to fit the needs of the frontend. It is built with Node.js, Express, and MySQL (hosted on Aiven).

**Endpoints:** products, customers, orders, order items, Stripe checkout webhook

**Tech stack:** Node.js, Express, TypeScript, MySQL, Stripe, Vercel
