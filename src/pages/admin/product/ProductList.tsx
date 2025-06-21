import React from "react";
import { Link } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: number;
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
};

const ProductList = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://selva-server.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const handleDelete = (_id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`https://selva-server.vercel.app/api/products/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setProducts((prev) => prev.filter((product) => product._id !== _id));
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + New Product
        </Link>
      </div>
      <div className="grid gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4"
          >
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                {product.brand} | {product.category}
              </div>
              <div className="mt-2 flex gap-4 text-xs text-gray-400">
                <span>Stock: {product.stockQuantity}</span>
                <span>Rating: {product.rating}</span>
                <span>Reviews: {product.reviews}</span>
              </div>
              <div className="mt-2">
                <span className="font-bold text-purple-700">
                  ${product.discountPrice ?? product.price}
                </span>
                {product.discountPrice && (
                  <span className="ml-2 line-through text-gray-400">
                    ${product.price}
                  </span>
                )}
              </div>
              <div className="mt-2 flex gap-4">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="inline-block text-purple-700 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
