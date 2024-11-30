<template>
  <div>
    <!-- Header -->
    <header class="position-relative" style="z-index: 9999">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <!-- Logo -->
          <router-link class="navbar-brand d-flex align-items-center" to="/">
            <img src="../assets/images/logo.png" alt="Logo trang chủ" style="height: 40px" class="me-2" />
          </router-link>
          <!-- Toggler for mobile view -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- Navigation links -->
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/" exact-active-class="active">
                  <i class="fa-solid fa-house"></i> Trang Chủ
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/news" exact-active-class="active">
                  <i class="fa-solid fa-newspaper"></i> Tin Tức
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/tools" exact-active-class="active"
                  :class="{ 'disabled': !isLoggedIn }" :aria-disabled="!isLoggedIn">
                  <i class="fa-solid fa-gear"></i> Công cụ
                </router-link>
              </li>

            </ul>
            <!-- Login -->
            <ul class="navbar-nav">
              <!-- Hiển thị Đăng nhập khi chưa đăng nhập -->
              <li class="nav-item" v-if="!isLoggedIn">
                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                  <i class="fas fa-user"></i> Đăng nhập
                </a>
              </li>

              <!-- Hiển thị Tên người dùng và Đăng xuất khi đã đăng nhập -->
              <li class="nav-item dropdown" v-show="isLoggedIn">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i class="fas fa-user"></i> {{ userName }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <a class="dropdown-item" href="#" @click="logout">
                      <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- Modal Đăng nhập và Đăng ký -->
    <div v-show="showLoginModal" class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <!-- Tabs -->
            <ul class="nav nav-tabs" id="loginTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="loginTabLink" data-bs-toggle="tab" href="#loginTabContent" role="tab"
                  aria-controls="loginTabContent" aria-selected="true">Đăng nhập</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="registerTabLink" data-bs-toggle="tab" href="#registerTabContent" role="tab"
                  aria-controls="registerTabContent" aria-selected="false">Đăng ký</a>
              </li>
            </ul>
            <div class="tab-content mt-3">
              <!-- Đăng nhập tab content -->
              <div class="tab-pane fade show active" id="loginTabContent" role="tabpanel"
                aria-labelledby="loginTabLink">
                <form @submit.prevent="loginUser">
                  <h5 class="modal-title w-100 text-center" id="loginModalLabel">
                    Đăng nhập tài khoản
                  </h5>

                  <!-- Thông báo thành công -->
                  <div v-if="successMessageLogin" class="alert alert-success" role="alert">
                    {{ successMessageLogin }}
                  </div>

                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Nhập email" v-model="loginEmail" />
                    <p v-if="loginEmailError" style="color: red">
                      {{ loginEmailError }}
                    </p>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu</label>
                    <input type="password" class="form-control" id="password" placeholder="Nhập mật khẩu"
                      v-model="loginPassword" />
                    <p v-if="loginPasswordError" style="color: red">
                      {{ loginPasswordError }}
                    </p>
                  </div>
                  <button type="submit" class="btn btn-dark w-100">
                    Đăng nhập
                  </button>
                </form>
              </div>
              <!-- Đăng ký tab content -->
              <div class="tab-pane fade" id="registerTabContent" role="tabpanel" aria-labelledby="registerTabLink">
                <form @submit.prevent="registerUser">
                  <h5 class="modal-title w-100 text-center" id="loginModalLabel">
                    Đăng ký tài khoản
                  </h5>

                  <!-- Thông báo thành công -->
                  <div v-if="successMessage" class="alert alert-success" role="alert">
                    {{ successMessage }}
                  </div>

                  <div class="mb-3">
                    <label for="registerName" class="form-label">Tên người dùng</label>
                    <input type="text" class="form-control" id="registerName" placeholder="Nhập tên người dùng"
                      v-model="name" />
                    <p v-if="nameError" style="color: red">{{ nameError }}</p>
                  </div>
                  <div class="mb-3">
                    <label for="registerPhone" class="form-label">Số điện thoại</label>
                    <input type="text" class="form-control" id="registerPhone" placeholder="Nhập số điện thoại"
                      v-model="phone" />
                    <p v-if="phoneError" style="color: red">{{ phoneError }}</p>
                  </div>
                  <div class="mb-3">
                    <label for="registerEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="registerEmail" placeholder="Nhập email"
                      v-model="email" />
                    <p v-if="emailError" style="color: red">{{ emailError }}</p>
                  </div>
                  <div class="mb-3">
                    <label for="registerPassword" class="form-label">Mật khẩu</label>
                    <input type="password" class="form-control" id="registerPassword" placeholder="Nhập mật khẩu"
                      v-model="password" />
                    <p v-if="passwordError" style="color: red">
                      {{ passwordError }}
                    </p>
                  </div>
                  <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Nhập lại mật khẩu"
                      v-model="confirm" />
                    <p v-if="confirmError" style="color: red">
                      {{ confirmError }}
                    </p>
                  </div>
                  <button type="submit" class="btn btn-dark w-100">
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useRouter } from 'vue-router'; // Import useRouter

const router = useRouter(); // Khởi tạo đối tượng router
const currentUser = ref('Khách'); // Mặc định là "Khách"

const isLoggedIn = ref(false);
const userName = ref(""); // Khai báo userName như một ref

const name = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");

const loginEmail = ref("");
const loginPassword = ref("");

const nameError = ref("");
const phoneError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmError = ref("");

const loginEmailError = ref("");
const loginPasswordError = ref("");

const successMessage = ref("");
const successMessageLogin = ref("");

// Biểu thức chính quy để kiểm tra định dạng email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerUser = () => {
  nameError.value = "";
  phoneError.value = "";
  emailError.value = "";
  passwordError.value = "";
  confirmError.value = "";
  successMessage.value = "";

  let hasError = false;

  // Kiểm tra các trường thông tin
  if (!name.value) {
    nameError.value = "Tên người dùng là bắt buộc.";
    hasError = true;
  }

  if (!phone.value) {
    phoneError.value = "Số điện thoại là bắt buộc.";
    hasError = true;
  }

  if (!email.value) {
    emailError.value = "Email là bắt buộc.";
    hasError = true;
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Vui lòng nhập email hợp lệ.";
    hasError = true;
  }

  if (!password.value) {
    passwordError.value = "Mật khẩu là bắt buộc.";
    hasError = true;
  }

  if (!confirm.value) {
    confirmError.value = "Xác nhận mật khẩu là bắt buộc.";
    hasError = true;
  } else if (confirm.value !== password.value) {
    confirmError.value = "Mật khẩu xác nhận không khớp.";
    hasError = true;
  }

  if (!hasError) {
    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email đã tồn tại
    const existingUser = users.find((user) => user.email === email.value);
    if (existingUser) {
      emailError.value = "Email đã tồn tại. Vui lòng sử dụng email khác.";
      return;
    }

    // Thêm người dùng mới vào danh sách
    users.push({
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    });

    // Lưu lại danh sách vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Hiển thị thông báo thành công
    successMessage.value = "Đăng ký thành công!";

    // Xóa thông tin đã nhập
    name.value = "";
    phone.value = "";
    email.value = "";
    password.value = "";
    confirm.value = "";
  }
};
const showLoginModal = ref(true); // Thêm ref cho trạng thái modal
const hideBackdrop = () => {
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.remove(); // Xóa lớp backdrop
  }
  document.body.classList.remove("modal-open"); // Xóa trạng thái `modal-open` khỏi body
  document.body.style.overflow = ""; // Đảm bảo body không bị khóa cuộn
};

const loginUser = () => {
  loginEmailError.value = "";
  loginPasswordError.value = "";

  let hasError = false;

  if (!loginEmail.value) {
    loginEmailError.value = "Email là bắt buộc.";
    hasError = true;
  } else if (!emailRegex.test(loginEmail.value)) {
    loginEmailError.value = "Vui lòng nhập email hợp lệ.";
    hasError = true;
  }

  if (!loginPassword.value) {
    loginPasswordError.value = "Mật khẩu là bắt buộc.";
    hasError = true;
  }

  if (!hasError) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.email === loginEmail.value && user.password === loginPassword.value
    );

    if (user) {
      successMessageLogin.value = "Đăng nhập thành công!";
      userName.value = user.name;  // Cập nhật userName khi đăng nhập thành công
      isLoggedIn.value = true;  // Đánh dấu người dùng đã đăng nhập
      currentUser.value = user.name; // Lấy tên người dùng từ localStorage

      // Lưu thông tin email của người dùng đã đăng nhập
      localStorage.setItem("currentUserEmail", user.email);
      localStorage.setItem("currentUserName", user.name);

      loginEmail.value = "";
      loginPassword.value = "";

      name.value = "";
      phone.value = "";
      email.value = "";
      password.value = "";
      confirm.value = "";

      nameError.value = "";
      phoneError.value = "";
      emailError.value = "";
      passwordError.value = "";
      confirmError.value = "";

      // Tắt modal
      showLoginModal.value = false;
      hideBackdrop(); // Xóa backdrop sau khi modal tắt
    } else {
      loginPasswordError.value = "Email hoặc mật khẩu không đúng.";
    }
  }
};



const logout = () => {
  isLoggedIn.value = false; // Đặt trạng thái đăng nhập về false
  userName.value = ""; // Xóa tên người dùng
  successMessageLogin.value = ""; // Xóa thông báo thành công (nếu có)
  successMessage.value = "";
  localStorage.removeItem("user"); // Xóa thông tin trong localStorage nếu cần
  currentUser.value = "";
  // Điều hướng về trang chủ sau khi đăng xuất
  router.push('/'); // Quay về trang chủ
};

</script>
