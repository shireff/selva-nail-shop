import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  serviceId: "",
  date: "",
  time: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  status: "pending",
  notes: "",
  totalPrice: 0,
};

const BookingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(!!id);

  React.useEffect(() => {
    if (id) {
      fetch(`https://selva-server.vercel.app/api/bookings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({ ...initialState, ...data });
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `https://selva-server.vercel.app/api/bookings/${id}`
      : "https://selva-server.vercel.app/api/bookings";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/admin/bookings");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">{id ? "Edit" : "New"} Booking</h1>
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="serviceId"
        placeholder="Service ID"
        value={form.serviceId}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="time"
        placeholder="Time (e.g. 09:00)"
        value={form.time}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="customerName"
        placeholder="Customer Name"
        value={form.customerName}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="customerEmail"
        placeholder="Customer Email"
        value={form.customerEmail}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="customerPhone"
        placeholder="Customer Phone"
        value={form.customerPhone}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="totalPrice"
        type="number"
        placeholder="Total Price"
        value={form.totalPrice}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full mb-3 border px-3 py-2 rounded"
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        rows={3}
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded font-semibold"
      >
        Save
      </button>
    </form>
  );
};

export default BookingEdit;
