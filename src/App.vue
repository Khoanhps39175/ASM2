<template>
  <div id="app">
    <!-- Hiển thị nội dung từ Vue Router -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* CSS toàn cục cho ứng dụng, nếu cần */
html, body, #app {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
