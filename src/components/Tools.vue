<template>
    <div class="d-flex flex-column min-vh-100">
        <main class="container mt-5">
            <h2 class="text-center mb-4">Công Cụ</h2>
            <div class="row">
                <div class="col-md-3">
                    <div class="list-group list-group-item-dark">
                        <a href="#tabInfo" class="list-group-item list-group-item-action active" data-bs-toggle="list"
                            role="tab">
                            <i class="fa-solid fa-address-card"></i> Thông Tin Cá Nhân
                        </a>
                        <a href="#tabPost" class="list-group-item list-group-item-action" data-bs-toggle="list"
                            role="tab">
                            <i class="fa-solid fa-upload"></i> Đăng Bài Viết
                        </a>
                        <a href="#tabNew" class="list-group-item list-group-item-action" data-bs-toggle="list"
                            role="tab">
                            <i class="fa-solid fa-file-alt"></i> Bài Viết Đã Đăng
                        </a>
                    </div>
                </div>

                <div class="col-md-9">
                    <div class="tab-content p-4 border rounded-3 bg-white mb-3">
                        <!-- Thông Tin Cá Nhân -->
                        <div class="tab-pane fade show active" id="tabInfo" role="tabpanel">
                            <h5><i class="fa-solid fa-address-card"></i> Thông Tin Cá Nhân</h5>
                            <hr />
                            <form @submit.prevent="updateUserInfo">
                                <div class="mb-3 text-center">
                                    <img :src="avatarPreview || 'https://via.placeholder.com/150'" alt="Ảnh đại diện"
                                        class="img-thumbnail" style="width: 150px; height: 200px;" />
                                </div>
                                <div class="mb-3">
                                    <label for="userAvatar" class="form-label">Cập Nhật Ảnh Đại Diện</label>
                                    <input type="file" class="form-control" id="userAvatar" @change="onAvatarChange" />
                                </div>
                                <div class="mb-3">
                                    <label for="userName" class="form-label">Tên Người Dùng</label>
                                    <input type="text" class="form-control" id="userName" v-model="nameInfo"
                                        placeholder="Nhập tên người dùng" required />
                                </div>
                                <div class="mb-3">
                                    <label for="userEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="userEmail" v-model="emailInfo"
                                        placeholder="Nhập email" required readonly />
                                </div>
                                <div class="mb-3">
                                    <label for="userPhone" class="form-label">Số Điện Thoại</label>
                                    <input type="text" class="form-control" id="userPhone" v-model="phoneInfo"
                                        placeholder="Nhập số điện thoại" required />
                                </div>
                                <div class="mb-3">
                                    <label for="userPassword" class="form-label">Mật Khẩu</label>
                                    <input type="password" class="form-control" id="userPassword" v-model="passwordInfo"
                                        placeholder="Nhập mật khẩu mới" />
                                </div>
                                <button type="submit" class="btn btn-dark w-100">Cập nhật thông tin</button>
                            </form>

                            <!-- Thông báo thành công -->
                            <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
                                {{ successMessage }}
                            </div>
                        </div>

                        <!-- Đăng bài viết -->
                        <div class="tab-pane fade" id="tabPost" role="tabpanel">
                            <h5><i class="fa-solid fa-upload"></i> Đăng Bài Viết</h5>
                            <hr />
                            <form @submit.prevent="submitPost">
                                <div class="mb-3">
                                    <label for="title" class="form-label">Tiêu Đề</label>
                                    <input type="text" class="form-control" id="title" v-model="title"
                                        placeholder="Nhập tiêu đề bài viết" required />
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Mô Tả</label>
                                    <textarea class="form-control" id="description" rows="3" v-model="description"
                                        placeholder="Nhập mô tả bài viết"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="content" class="form-label">Nội Dung</label>
                                    <textarea class="form-control" id="content" rows="5" v-model="content"
                                        placeholder="Nhập nội dung bài viết" required></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="image" class="form-label">Chọn Ảnh</label>
                                    <input type="file" class="form-control" id="image" @change="onImageChange" />
                                    <div v-if="imagePreview" class="mt-2">
                                        <img :src="imagePreview" class="img-thumbnail"
                                            style="max-height: 200px; max-width: 100%;" alt="Xem trước ảnh" />
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-dark w-100">Đăng bài</button>
                            </form>
                        </div>

                        <!-- Bài Viết Đã Đăng -->
                        <div class="tab-pane fade" id="tabNew" role="tabpanel">
                            <h5><i class="fa-solid fa-file-alt"></i> Bài Viết Đã Đăng</h5>
                            <hr />
                            <ul class="list-group">
                                <li class="list-group-item" v-for="(post, index) in posts" :key="index">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex">
                                            <div v-if="post.image" class="me-3">
                                                <img :src="post.image" class="img-thumbnail"
                                                    style="max-width: 150px; height: auto;" alt="Ảnh bài viết" />
                                            </div>
                                            <div>
                                                <h6>{{ post.title }}</h6>
                                                <small class="text-muted">{{ post.date }}</small>
                                            </div>
                                        </div>
                                        <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">
                                            Xóa
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <p v-if="posts.length === 0" class="text-muted text-center mt-3">
                                Không có bài viết nào.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Các biến để lưu trữ thông tin người dùng và bài viết
const nameInfo = ref('');
const emailInfo = ref('');
const phoneInfo = ref('');
const passwordInfo = ref('');
const avatarPreview = ref('');
const avatarFile = ref(null);
const successMessage = ref('');
const posts = ref([]);
const title = ref('');
const description = ref('');
const content = ref('');
const imagePreview = ref('');

// Hàm chạy khi component được mounted
onMounted(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === currentUserEmail);
        if (user) {
            nameInfo.value = user.name;
            emailInfo.value = user.email;
            phoneInfo.value = user.phone;
            avatarPreview.value = user.avatar || ''; // Lấy ảnh từ base64 nếu có
        }

        const userPosts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.value = userPosts.filter(post => post.email === currentUserEmail);
    }
});

// Cập nhật thông tin người dùng
const updateUserInfo = () => {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === currentUserEmail);

        if (userIndex !== -1) {
            users[userIndex].name = nameInfo.value;
            users[userIndex].phone = phoneInfo.value;
            if (passwordInfo.value) users[userIndex].password = passwordInfo.value;
            if (avatarPreview.value) users[userIndex].avatar = avatarPreview.value; // Lưu base64

            localStorage.setItem('users', JSON.stringify(users));
            successMessage.value = 'Thông tin cá nhân đã được cập nhật.';
        }
    }
};

// Chọn ảnh đại diện
const onAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        avatarFile.value = file;

        // Đọc file ảnh và chuyển đổi thành base64
        const reader = new FileReader();
        reader.onloadend = () => {
            avatarPreview.value = reader.result; // Lưu ảnh dưới dạng base64
        };
        reader.readAsDataURL(file); // Chuyển đổi file ảnh thành base64
    }
};

// Đăng bài viết
const submitPost = () => {
    if (!title.value || !content.value) return;

    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
        // Tạo ID duy nhất cho bài viết
        const newPostId = 'post-' + Date.now() + Math.floor(Math.random() * 1000);

        const newPost = {
            id: newPostId,  // Thêm ID cho bài viết
            email: currentUserEmail,
            title: title.value,
            description: description.value,
            content: content.value,
            image: imagePreview.value, // Lưu ảnh dưới dạng base64
            date: new Date().toLocaleDateString()
        };

        const userPosts = JSON.parse(localStorage.getItem('posts')) || [];
        userPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(userPosts));

        posts.value.push(newPost);
        title.value = '';
        content.value = '';
        description.value = '';
        imagePreview.value = '';
    }
};

// Chọn ảnh cho bài viết
const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Đọc file ảnh và chuyển đổi thành base64
        const reader = new FileReader();
        reader.onloadend = () => {
            imagePreview.value = reader.result; // Lưu ảnh dưới dạng base64
        };
        reader.readAsDataURL(file); // Chuyển đổi file ảnh thành base64
    }
};

// Xóa bài viết
const deletePost = (postId) => {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
        const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = allPosts.filter(post => post.email === currentUserEmail && post.id !== postId);

        // Cập nhật lại localStorage với danh sách bài viết đã được xóa
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        // Cập nhật lại danh sách bài viết trong component
        posts.value = updatedPosts.filter(post => post.email === currentUserEmail);
    }
};
</script>
