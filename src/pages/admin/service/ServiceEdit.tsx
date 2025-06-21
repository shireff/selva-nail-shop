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
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id) {
      fetch(`https://selva-server.vercel.app/api/services/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            features: data.features?.join(", ") || "",
          });
          setImagePreview(data.image);
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
    formData.append("duration", form.duration.toString());
    formData.append("category", form.category);
    formData.append("features", form.features);
    formData.append("isPopular", form.isPopular ? "true" : "false");

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (form.image) {
      formData.append("image", form.image);
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `https://selva-server.vercel.app/api/services/${id}`
      : "https://selva-server.vercel.app/api/services";

    try {
      await fetch(url, {
        method,
        body: formData,
      });
      navigate("/admin/services");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      return;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">New Service</h1>

      <div className="mb-3 flex flex-col">
        <label className="text-sm font-semibold">Name</label>
        <input
          className="w-full border px-3 py-2 rounded"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 flex flex-col">
        <label className="text-sm font-semibold">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="mb-3 flex flex-col">
        <label className="text-sm font-semibold">Price</label>
        <input
          className="w-full border px-3 py-2 rounded"
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 flex flex-col">
        <label className="text-sm font-semibold">Duration (minutes)</label>
        <input
          className="w-full border px-3 py-2 rounded"
          name="duration"
          type="number"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 flex flex-col">
        <label className="text-sm font-semibold">Category</label>
        <input
          className="w-full border px-3 py-2 rounded"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 flex flex-col">
        <label className="text-sm font-semibold">
          Features (comma separated)
        </label>
        <input
          className="w-full border px-3 py-2 rounded"
          name="features"
          placeholder="Features"
          value={form.features}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          name="isPopular"
          checked={form.isPopular}
          onChange={handleChange}
        />
        <span className="ml-2">Popular</span>
      </div>

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

      <button
        type="submit"
        className="w-full bg-purple-600 text-white px-6 py-2 rounded font-semibold"
      >
        Save
      </button>
    </form>
  );
};

export default ServiceEdit;
