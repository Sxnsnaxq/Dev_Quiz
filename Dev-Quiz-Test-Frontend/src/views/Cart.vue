<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Cart</h1>
      <div v-if="cart.length">
        <CartItem
          v-for="item in cart"
          :key="item.id"
          :item="item"
          @remove="removeFromCart"
        />
        <div class="text-right mt-4">
          <p class="font-bold">Discount: {{ totalDiscount }} THB</p> <!-- ส่วนลด -->
          <p class="font-bold">Total after Discount: {{ totalPrice }} THB</p> <!-- ราคารวม -->
        </div>
      </div>
      <p v-else>No items in the cart.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import CartItem from "../components/CartItem.vue";
  
  // ตะกร้าสินค้า
  const cart = ref(JSON.parse(localStorage.getItem("cart") || "[]"));
  
  // คำนวณส่วนลด
  const totalDiscount = computed(() => {
  // คัดลอกข้อมูลเพื่อหลีกเลี่ยงการเปลี่ยนค่าของ `cart.value`
  const uniqueBooks = cart.value
    .filter((item) => item.quantity > 0)
    .map((item) => ({ ...item })); // สร้างสำเนาของสินค้า

  const bookSets = [];

  // สร้างชุดหนังสือไม่ซ้ำ
  while (uniqueBooks.some((book) => book.quantity > 0)) {
    const set = [];
    uniqueBooks.forEach((book) => {
      if (book.quantity > 0) {
        set.push(book);
        book.quantity -= 1; // ลดจำนวนลงในแต่ละรอบ
      }
    });
    bookSets.push(set);
  }

  // คำนวณส่วนลดแต่ละชุด
  let discount = 0;
  bookSets.forEach((set) => {
    const size = set.length; // จำนวนหนังสือในชุด
    if (size === 2) discount += size * 100 * 0.10; // ลด 10%
    if (size === 3) discount += size * 100 * 0.20; // ลด 20%
    if (size === 4) discount += size * 100 * 0.30; // ลด 30%
    if (size === 5) discount += size * 100 * 0.40; // ลด 40%
    if (size === 6) discount += size * 100 * 0.50; // ลด 50%
    if (size === 7) discount += size * 100 * 0.60; // ลด 60%
  });

  return discount;
});
  
  // คำนวณราคารวมหลังหักส่วนลด
  const totalPrice = computed(() => {
    const total = cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total - totalDiscount.value;
  });
  
  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  function removeFromCart(id) {
    cart.value = cart.value.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
  </script>
  