import { createRouter, createWebHistory } from "vue-router";

// Import các thành phần
import MainLayout from "@/views/MainLayout.vue";
import Home from "@/components/Home.vue";
import News from "@/components/News.vue";
import Tools from "@/components/Tools.vue";
import Detail from "@/components/Detail.vue"; // Trang chi tiết bài viết

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "Home", component: Home }, // Trang chủ
      { path: "news", name: "News", component: News }, // Trang tin tức
      { 
        path: "tools", 
        name: "Tools", 
        component: Tools, 
        meta: { requiresAuth: true } // Trang công cụ yêu cầu đăng nhập
      }, 
      { 
        path: "detail/:id", 
        name: "Detail", 
        component: Detail, 
        props: true // Chuyển tham số id vào props
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Kiểm tra trạng thái đăng nhập trong localStorage
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Kiểm tra trạng thái đăng nhập

  // Kiểm tra nếu route yêu cầu xác thực
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Home' }); // Chuyển hướng về trang chủ nếu chưa đăng nhập
    } else {
      next(); // Cho phép truy cập nếu đã đăng nhập
    }
  } else {
    next(); // Cho phép truy cập nếu không yêu cầu xác thực
  }
});

export default router;
