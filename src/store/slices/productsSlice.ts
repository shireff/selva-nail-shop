/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
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
}

interface ProductsState {
  products: Product[];
  categories: string[];
  brands: string[];
  cartItems: { productId: string; quantity: number }[];
  wishlist: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  brands: [],
  cartItems: [],
  wishlist: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters?: { category?: string; brand?: string; search?: string }) => {
    const params = new URLSearchParams(filters as any);
    const response = await fetch(
      `https://selva-server.vercel.app/api/products?${params}`
    );
    return response.json();
  }
);

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await fetch("https://selva-server.vercel.app/api/products/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  }
);

export const removeFromCart = createAsyncThunk(
  "products/removeFromCart",
  async (productId: string) => {
    await fetch(`https://selva-server.vercel.app/api/cart/${productId}`, { method: "DELETE" });
    return productId;
  }
);

export const toggleWishlist = createAsyncThunk(
  "products/toggleWishlist",
  async (productId: string) => {
    const response = await fetch("https://selva-server.vercel.app/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.brands = action.payload.brands;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.cartItems.find(
          (item) => item.productId === action.payload.productId
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const { productId, isInWishlist } = action.payload;
        if (isInWishlist) {
          state.wishlist.push(productId);
        } else {
          state.wishlist = state.wishlist.filter((id) => id !== productId);
        }
      });
  },
});

export const { clearError, updateCartQuantity } = productsSlice.actions;
export default productsSlice.reducer;
