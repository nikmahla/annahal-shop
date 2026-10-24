# 🐝 Annahal Shop

A honey-shop **e-commerce front end** built with **Next.js 14 (App Router)**, **Zustand** and **Material-UI**.
Browse and search products, open product detail pages, and manage a basket and wishlist that survive page reloads.

👉 **[Live demo](https://annahal-shop-bn2l.vercel.app/)**

> Frontend portfolio project. There is no checkout or payment: product data comes from a mock REST API, and reviews on the home page are sample content.

## Screenshots
![Home](https://github.com/user-attachments/assets/b41a84ee-8c71-4a10-bd88-43294ede8616)
![Products](https://github.com/user-attachments/assets/7e8d4d96-c623-4efd-91af-3001938b89a7)
![Product detail](https://github.com/user-attachments/assets/bcc7882e-0d25-472b-a2a9-491e8334d413)
![Basket](https://github.com/user-attachments/assets/0d0a6835-8574-4cb0-95e1-d6f925075bef)
![Mobile](https://github.com/user-attachments/assets/58ad9f9e-21ef-4318-88ff-eec9cc3d626c)

## Features
- Product listing with search
- Dynamic product detail pages (`/mainBoxes/[id]`) with a loading skeleton
- Basket and wishlist stored with Zustand and persisted in `localStorage`
- Responsive layout (mobile to desktop) with carousels (Swiper, react-slick)
- Page metadata set through the Next.js Metadata API
- Product search and filtering

## Tech stack
| Area | Tools |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| State | Zustand + `localStorage` |
| UI | Material-UI (MUI) v6, Tailwind CSS, Swiper |
| Data | [MockAPI](https://mockapi.io) REST endpoint |
| Deploy | Vercel |

## Run locally
```bash
git clone https://github.com/nikmahla/annahal-shop.git
cd annahal-shop
npm install
npm run dev      # http://localhost:3000
```

## Possible next steps
- Real backend (database + auth) instead of the mock API
- Checkout flow and order history
- Tests for the basket store (Jest / React Testing Library)

## Author
**Fatemeh Nikookar** – Frontend Developer · August 2025
