<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-8 text-center">Products</h1>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import ProductCard from "../components/ProductCard.vue";
  
  const products = ref([
    { id: 1, name: "Harry Potter กับศิลาอาถรรพ์", price: 100, image: "https://api.chulabook.com/images/pid-137958.jpg" },
    { id: 2, name: "Harry Potter กับห้องแห่งความลับ", price: 100, image: "https://api.chulabook.com/images/pid-137947.jpg" },
    { id: 3, name: "Harry Potter กับนักโทษแห่งอัซคาบัน", price: 100, image: "https://api.chulabook.com/images/pid-137956.jpg" },
    { id: 4, name: "Harry Potter กับถ้วยอัคนี", price: 100, image: "https://api.chulabook.com/images/pid-137954.jpg" },
    { id: 5, name: "Harry Potter กับภาคีนกฟินิกซ์", price: 100, image: "https://api.chulabook.com/images/pid-110189.jpg" },
    { id: 6, name: "Harry Potter กับเจ้าชายเลือดผสม", price: 100, image: "https://api.chulabook.com/images/pid-110190.jpg" },
    { id: 7, name: "Harry Potter กับเครื่องรางยมทูต", price: 100, image: "https://api.chulabook.com/images/pid-110191.jpg" },
  ]);
  
  const cart = ref(JSON.parse(localStorage.getItem("cart") || "[]"));
  
  function addToCart(product) {
    const existingProduct = cart.value.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
  </script>
  