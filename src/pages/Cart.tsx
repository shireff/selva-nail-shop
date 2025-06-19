import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products/cart");
      const data = await res.json();
      setCart(data.cart || []);
      setLoading(false);
    };
    fetchCart();
  }, []);

  const handleRemove = async (productId: string) => {
    setLoading(true);
    await fetch(`http://localhost:5000/api/products/cart/${productId}`, {
      method: "DELETE",
    });
    setCart(cart.filter((item) => item.product.id !== productId));
    setLoading(false);
  };

  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setLoading(true);
    await fetch("http://localhost:5000/api/products/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
    setLoading(false);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );

  if (loading && cart.length === 0)
    return <div className="p-8 text-center text-gray-500">Loading cart...</div>;

  if (cart.length === 0)
    return (
      <div className="p-8 text-center text-gray-500">Your cart is empty.</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.product.id} className="flex items-center py-4">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <div className="font-semibold">{item.product.name}</div>
              <div className="text-gray-600">
                £{item.product.discountPrice ?? item.product.price}
              </div>
              <div className="flex items-center mt-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    handleQuantityChange(item.product.id, item.quantity - 1)
                  }
                  disabled={loading}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    handleQuantityChange(item.product.id, item.quantity + 1)
                  }
                  disabled={loading}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="ml-4 text-red-500 hover:underline"
              onClick={() => handleRemove(item.product.id)}
              disabled={loading}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="text-right mt-6 text-xl font-bold">
        Total: £{total.toFixed(2)}
      </div>
      <button
        className="mt-6 w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition"
        disabled={loading}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
