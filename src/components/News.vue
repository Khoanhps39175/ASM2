<template>
    <div class="d-flex flex-column min-vh-100">
        <!-- Content -->
        <main class="container py-4">
            <div class="row">
                <!-- Nếu không có bài viết nào -->
                <div v-if="posts.length === 0" class="col-12 text-center">
                    <p>Chưa có bài viết nào.</p>
                </div>

                <!-- Duyệt qua các bài viết từ localStorage -->
                <div v-for="post in posts" :key="post.id" class="col-12">
                    <router-link :to="'/detail/' + post.id" class="text-decoration-none">
                        <div class="card mb-3 shadow-sm hover-shadow-lg">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <!-- Sử dụng tỷ lệ 16:9 cho hình ảnh -->
                                    <div class="ratio ratio-16x9">
                                        <img :src="post.image || '../assets/images/default-image.png'" class="img-fluid"
                                            alt="Bài viết" />
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ post.title }}</h5>
                                        <p class="card-text">{{ post.description }}</p> <!-- Hiển thị mô tả -->
                                        <p class="card-text">
                                            <small class="text-muted">{{ post.date }}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Khai báo biến lưu trữ danh sách bài viết
const posts = ref([]);

// Tải bài viết từ localStorage khi component được tải
onMounted(() => {
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    if (Array.isArray(allPosts)) {
        posts.value = allPosts;
    } else {
        console.error("Dữ liệu bài viết không hợp lệ trong localStorage.");
    }
});
</script>
