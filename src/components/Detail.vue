<template>
    <div class="container my-5">
        <div class="row">
            <!-- Nội dung bài viết -->
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <h1 class="card-title">{{ post?.title }}</h1>
                        <p class="text-muted">{{ post?.date }}</p>
                        <p>{{ post?.description }}</p>
                        <img :src="post?.image || '../assets/images/default-image.png'" alt="Post Image"
                            class="img-fluid mb-3">
                        <p>{{ post?.content }}</p>
                    </div>
                </div>
            </div>

            <!-- Phần bình luận -->
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <h5>Bình luận</h5>
                    </div>
                    <div class="card-body">
                        <!-- Nếu chưa đăng nhập, yêu cầu đăng nhập -->
                        <div v-if="!isLoggedIn">
                            <p>Vui lòng <a href="#" @click="redirectToLogin">đăng nhập</a> để bình luận.</p>
                        </div>

                        <!-- Form bình luận khi đã đăng nhập -->
                        <div v-else>
                            <form @submit.prevent="submitComment">
                                <div class="mb-3">
                                    <textarea v-model="newComment" class="form-control"
                                        placeholder="Nhập bình luận..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Gửi</button>
                            </form>
                        </div>

                        <!-- Danh sách bình luận -->
                        <div v-if="comments.length">
                            <div v-for="(comment, index) in comments" :key="index" class="mb-3">
                                <strong>{{ comment.name }}</strong>
                                <p>{{ comment.content }}</p>
                            </div>
                        </div>
                        <div v-else>
                            <p>Chưa có bình luận nào.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref(null);
const newComment = ref('');
const comments = ref([]);
const isLoggedIn = ref(localStorage.getItem('currentUserEmail') !== null);
const currentUser = ref(localStorage.getItem('currentUserName') || 'Khách');
const route = useRoute();
const router = useRouter();
const postId = route.params.id;

onMounted(() => {
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    post.value = allPosts.find(post => post.id === postId) || null;
    comments.value = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
});

const submitComment = () => {
    if (!newComment.value.trim()) return alert('Bình luận không được để trống!');
    comments.value.push({ name: currentUser.value, content: newComment.value.trim() });
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments.value));
    newComment.value = '';
};

const redirectToLogin = () => {
    router.push({ name: 'login' });
};
</script>