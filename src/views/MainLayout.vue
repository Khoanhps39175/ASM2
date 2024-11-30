<template>
  <div>
    <!-- Thay thế header bằng TheHeader -->
    <the-header></the-header>

    <!-- Main content -->
    <main class="container mt-5">
      <router-view />
    </main>

    <!-- Footer -->
    <!-- Chỉ hiển thị footer nếu không phải trang Home -->
    <footer v-if="!isHomePage" class="bg-dark p-3 mt-auto">
      <p class="text-center text-white">@author: PS39175: NguyenHuuKhoa</p>
    </footer>
  </div>
</template>

<script>
// Import TheHeader component
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: "MainLayout",
  components: {
    // Đăng ký TheHeader component
    TheHeader,
  },
  computed: {
    // Kiểm tra xem đường dẫn có phải là trang Home không
    isHomePage() {
      return this.$route.path === '/'; // hoặc tùy vào đường dẫn trang chủ của bạn
    }
  }
};
</script>
