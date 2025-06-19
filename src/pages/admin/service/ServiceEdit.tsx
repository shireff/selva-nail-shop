import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  price: 0,
  duration: 0,
  image: "",
  category: "",
  features: "",
  isPopular: false,
};

const ServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(!!id);

  React.useEffect(() => {
    if (id) {
      fetch(`https://selva-server.vercel.app/api/services/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            features: data.features?.join(", ") || "",
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
      ? `https://selva-server.vercel.app/api/services/${id}`
      : "https://selva-server.vercel.app/api/services";
    const body = {
      ...form,
      features: form.features.split(",").map((t) => t.trim()),
    };
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    navigate("/admin/services");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">{id ? "Edit" : "New"} Service</h1>
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full mb-3 border px-3 py-2 rounded"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        rows={4}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="duration"
        type="number"
        placeholder="Duration (minutes)"
        value={form.duration}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="features"
        placeholder="Features (comma separated)"
        value={form.features}
        onChange={handleChange}
      />
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          name="isPopular"
          checked={form.isPopular}
          onChange={handleChange}
        />
        <span className="ml-2">Popular</span>
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

export default ServiceEdit;
