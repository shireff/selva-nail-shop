import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  price: 0,
  discountPrice: 0,
  images: "",
  category: "",
  brand: "",
  inStock: true,
  stockQuantity: 0,
  rating: 0,
  reviews: 0,
  tags: "",
  isNew: false,
  isFeatured: false,
};

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(!!id);

  React.useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            images: data.images?.join(", ") || "",
            tags: data.tags?.join(", ") || "",
          });
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
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
      ? `http://localhost:5000/api/products/${id}`
      : "http://localhost:5000/api/products";
    const body = {
      ...form,
      images: form.images.split(",").map((t) => t.trim()),
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    navigate("/admin/products");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">{id ? "Edit" : "New"} Product</h1>
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
        name="discountPrice"
        type="number"
        placeholder="Discount Price"
        value={form.discountPrice}
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="images"
        placeholder="Images (comma separated URLs)"
        value={form.images}
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
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="stockQuantity"
        type="number"
        placeholder="Stock Quantity"
        value={form.stockQuantity}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="rating"
        type="number"
        placeholder="Rating"
        value={form.rating}
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="reviews"
        type="number"
        placeholder="Reviews"
        value={form.reviews}
        onChange={handleChange}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          name="inStock"
          checked={form.inStock}
          onChange={handleChange}
        />
        <span className="ml-2">In Stock</span>
      </label>
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          name="isNew"
          checked={form.isNew}
          onChange={handleChange}
        />
        <span className="ml-2">New</span>
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

export default ProductEdit;
