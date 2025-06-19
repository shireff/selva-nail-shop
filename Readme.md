# Selva Nail Shop – Fullstack Project

Welcome to the Selva Nail Shop project!  
This is a fullstack web application for a premium hard gel nail salon, featuring online booking, product catalog, admin dashboard, testimonials, and more.

---

## Features

- **Modern React Frontend**  
  - Built with React, Redux Toolkit, TypeScript, Vite, and Tailwind CSS.
  - Beautiful, mobile-friendly UI with Framer Motion animations.
  - Pages: Home, Services, Products, Booking, Blog, About, Contact, FAQ, Testimonials.
  - Admin dashboard for managing blogs, products, services, testimonials, and bookings.
  - Shopping cart and wishlist functionality.
  - WhatsApp integration for booking confirmations.

- **Express Backend**  
  - RESTful API for products, bookings, authentication, testimonials, and more.
  - In-memory data for demo (swap for database in production).
  - Swagger/OpenAPI documentation for all endpoints.
  - Twilio WhatsApp API integration for admin notifications.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/project-bolt-sb1-eaa22zne.git
cd project-bolt-sb1-eaa22zne/project
```

### 2. Install Dependencies


### 3. Run the App

```

#### Frontend

```sh
cd ../src
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
---

## Project Structure

```
project/
  src/               # React frontend (see below)
    App.tsx
    main.tsx
    components/
      layout/
      common/
    pages/
      admin/
      Home.tsx
      Products.tsx
      Booking.tsx
      ...
    store/
      slices/
      store.ts
    index.css
```

---

## Key Endpoints
See Swagger docs for full API.
link of swagger docs: https://app.swaggerhub.com/apis-docs/santoshkumark/Selva-Nail-Shop/1.0.0

---

## Customization

- **Products, services, testimonials, etc.** are stored in-memory for demo.  
  Swap for a database for production use.
- **WhatsApp integration** uses Twilio sandbox.  
  Set up your Twilio account and join the sandbox as described in the backend code.

---

## Credits

- UI: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- Icons: [Lucide](https://lucide.dev/)
- Backend: [Express](https://expressjs.com/)
- Messaging: [Twilio WhatsApp API](https://www.twilio.com/whatsapp)

---

## License

MIT

---

**Enjoy building with Selva Nail Shop!**