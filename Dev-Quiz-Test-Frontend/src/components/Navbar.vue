<template>
  <nav class="bg-blue-500 text-white p-4 sticky top-0 z-50">
    <div class="flex justify-end items-center space-x-8">
      <!-- ลิงก์ Home -->
      <router-link to="/" class="font-bold hover:underline">Home</router-link>
      <!-- ลิงก์ Cart -->
      <router-link to="/cart" class="font-bold hover:underline">Cart</router-link>
    </div>
  </nav>
</template>

<style>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>
