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
      { path: "tools", name: "Tools", component: Tools }, // Trang công cụ
      { path: "detail/:id", name: "Detail", component: Detail, props: true }, // Chuyển tham số id vào props
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
