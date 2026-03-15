<template>
    <div class="border p-4 rounded shadow hover:shadow-lg transition duration-200 ease-in-out max-w-sm mx-auto">
      <img
        :src="product.image"
        alt="Book Image"
        class="w-full h-64 object-cover rounded mb-4"
      />
      <h2 class="text-lg font-bold mb-2 text-center">{{ product.name }}</h2>
      <p class="text-center mb-4">{{ product.price }} THB</p>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        @click="addToCart"
      >
        Add to Cart
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  
  // รับ prop `product` อย่างถูกต้อง
  const props = defineProps({
    product: {
      type: Object, // กำหนดชนิดข้อมูลเป็น Object
      required: true, // กำหนดให้จำเป็นต้องส่ง prop นี้
    },
  });
  
  // ประกาศ emit เพื่อส่ง Event ไปยัง Parent Component
  const emit = defineEmits(["add-to-cart"]);
  
  // ฟังก์ชันสำหรับเพิ่มสินค้าไปยังตะกร้า
  function addToCart() {
    emit("add-to-cart", props.product); // อ้างอิง `product` จาก `defineProps`
  }
  </script>
  