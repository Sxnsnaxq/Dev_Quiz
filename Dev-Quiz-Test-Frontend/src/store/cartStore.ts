import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    updateQuantity({ id, change }) {
      const item = this.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          this.cart = this.cart.filter((item) => item.id !== id);
        }
      }
    },
  },
});
