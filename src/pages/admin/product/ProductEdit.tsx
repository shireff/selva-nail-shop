import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  price: 0,
  discountPrice: 0,
  image: "",
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
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id) {
      fetch(`https://selva-server.vercel.app/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            images: data.images?.join(", ") || "",
            tags: data.tags?.join(", ") || "",
          });
          setImagePreview(data.image);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("stockQuantity", form.stockQuantity.toString());
    formData.append("tags", form.tags);
    formData.append("isNew", form.isNew ? "true" : "false");
    formData.append("isFeatured", form.isFeatured ? "true" : "false");

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (form.image) {
      formData.append("image", form.image); 
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `https://selva-server.vercel.app/api/products/${id}`
      : "https://selva-server.vercel.app/api/products";

    try {
      await fetch(url, {
        method,
        body: formData,
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
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
      <div className=" items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center p-2 w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 h-40 object-cover rounded-md border"
          />
        )}
      </div>
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
