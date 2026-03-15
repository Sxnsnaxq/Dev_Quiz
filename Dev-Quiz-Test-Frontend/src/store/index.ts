import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    products: [] as { id: number; name: string; price: number; quantity: number }[],
  }),
  getters: {
    totalPrice: (state) =>
      state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
  },
  actions: {
    addToCart(product: { id: number; name: string; price: number; quantity: number }) {
      const existingProduct = this.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.products.push(product);
      }
    },
    removeFromCart(productId: number) {
      this.products = this.products.filter((p) => p.id !== productId);
    },
  },
});
