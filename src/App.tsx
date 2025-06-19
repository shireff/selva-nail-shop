import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Booking from "./pages/Booking";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";

// Store
import { initializeApp } from "./store/slices/appSlice";
import { AppDispatch } from "./store/store";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import BlogEdit from "./pages/admin/blog/BlogEdit";
import BlogList from "./pages/admin/blog/BlogList";
import ProductList from "./pages/admin/product/ProductList";
import ProductEdit from "./pages/admin/product/ProductEdit";
import ServiceList from "./pages/admin/service/ServiceList";
import ServiceEdit from "./pages/admin/service/ServiceEdit";
import TestimonialEdit from "./pages/admin/testimonial/TestimonialEdit";
import TestimonialList from "./pages/admin/testimonial/TestimonialList";
import BookingEdit from "./pages/admin/booking/BookingEdit";
import BookingList from "./pages/admin/booking/BookingList";
import RequireAdmin from "./pages/admin/RequireAdmin";
import Cart from "./pages/Cart";

function App() {
  const dispatch = useDispatch<AppDispatch>();
 const location = useLocation();
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Helmet>
        <title>Selva - Premium Hard Gel Nail Shop</title>
        <meta
          name="description"
          content="Experience luxury nail care with our premium hard gel services, expert technicians, and high-quality products."
        />
        <link rel="canonical" href="https://selva-nails.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            name: "Selva Hard Gel Nail Shop",
            image: "https://selva-nails.com/logo.png",
            description: "Premium hard gel nail services and products",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Beauty Street",
              addressLocality: "Cairo",
              addressCountry: "EG",
            },
            telephone: "+20-123-456-7890",
            url: "https://selva-nails.com",
            priceRange: "$$",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "20:00",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        {!isAdmin && <Navbar />}

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<Navigate to="blogs" replace />} />
                {/* Redirect /admin to /admin/blogs */}
                <Route path="blogs" element={<BlogList />} />
                <Route path="blogs/new" element={<BlogEdit />} />
                <Route path="blogs/:id/edit" element={<BlogEdit />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/new" element={<ProductEdit />} />
                <Route path="products/:id/edit" element={<ProductEdit />} />
                <Route path="services" element={<ServiceList />} />
                <Route path="services/new" element={<ServiceEdit />} />
                <Route path="services/:id/edit" element={<ServiceEdit />} />
                <Route path="testimonials" element={<TestimonialList />} />
                <Route path="testimonials/new" element={<TestimonialEdit />} />
                <Route
                  path="testimonials/:id/edit"
                  element={<TestimonialEdit />}
                />
                <Route path="bookings" element={<BookingList />} />
                <Route path="bookings/new" element={<BookingEdit />} />
                <Route path="bookings/:id/edit" element={<BookingEdit />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </main>

        {!isAdmin && <Footer />}
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
