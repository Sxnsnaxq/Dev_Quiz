<template>
    <div class="flex justify-between items-center border p-4 rounded">
      <div>
        <h3 class="font-bold">{{ item.name }}</h3>
        <p>Price: {{ item.price }} THB</p>
        <p>Quantity: {{ item.quantity }}</p>
      </div>
      <button
        class="bg-red-500 text-white px-4 py-2 rounded"
        @click="remove"
      >
        Remove
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  
  // รับ `item` ผ่าน props
  const props = defineProps({
    item: {
      type: Object, // กำหนดให้เป็น Object
      required: true, // ต้องส่งค่ามาเสมอ
    },
  });
  const item = props.item;
  
  // Event สำหรับส่ง ID ไปลบสินค้า
  const emit = defineEmits(["remove"]);
  
  function remove() {
    emit("remove", item.id); // ใช้ `item.id` เพื่อระบุสินค้าที่ต้องลบ
  }
  </script>
  