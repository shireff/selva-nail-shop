import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  category: "",
  featuredImage: "",
  tags: "",
  isPublished: false,
};

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(!!id);

  React.useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/blog/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            tags: data.tags?.join(", ") || "",
          });
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/api/blog/${id}`
      : "http://localhost:5000/api/blog";
    const body = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    navigate("/admin/blogs");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit" : "New"} Blog Post
      </h1>
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="excerpt"
        placeholder="Excerpt"
        value={form.excerpt}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full mb-3 border px-3 py-2 rounded"
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
        rows={6}
      />
      <input
        className="w-full mb-3 border px-3 py-2 rounded"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
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
        name="featuredImage"
        placeholder="Featured Image URL"
        value={form.featuredImage}
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
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
        />
        <span className="ml-2">Published</span>
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

export default BlogEdit;
