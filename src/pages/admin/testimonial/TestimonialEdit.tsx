import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  customerName: "",
  customerImage: "",
  rating: 5,
  review: "",
  serviceUsed: "",
  beforeImage: "",
  afterImage: "",
  isApproved: false,
  isFeatured: false,
};

const TestimonialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(!!id);

  React.useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/testimonials/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...initialState,
            ...data,
          });
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/api/testimonials/${id}`
      : "http://localhost:5000/api/testimonials";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/admin/testimonials");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit" : "New"} Testimonial
      </h1>
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
        name="customerImage"
        placeholder="Customer Image URL"
        value={form.customerImage}
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="serviceUsed"
        placeholder="Service Used"
        value={form.serviceUsed}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="beforeImage"
        placeholder="Before Image URL"
        value={form.beforeImage}
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="afterImage"
        placeholder="After Image URL"
        value={form.afterImage}
        onChange={handleChange}
      />
      <textarea
        className="w-full mb-3 border px-3 py-2 rounded"
        name="review"
        placeholder="Review"
        value={form.review}
        onChange={handleChange}
        required
        rows={4}
      />
      <label className="block mb-3">
        <span className="mr-2">Rating:</span>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={form.rating}
          onChange={handleChange}
          className="w-16 border px-2 py-1 rounded"
          required
        />
      </label>
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          name="isApproved"
          checked={form.isApproved}
          onChange={handleChange}
        />
        <span className="ml-2">Approved</span>
      </label>
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
        />
        <span className="ml-2">Featured</span>
      </label>
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded font-semibold"
      >
        Save
      </button>
    </form>
  );
};

export default TestimonialEdit;
