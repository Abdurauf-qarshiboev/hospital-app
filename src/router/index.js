import { navMenu } from "@/helpers/navMenu";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "defaultLayout",
      component: () => import("@/layouts/defaultLayout.vue"),
      children: [
        ...navMenu,
        {
          path: "doctor/:id",
          name: "doctor-show",
          component: () => import("@/views/defaults/doctorProfile.vue"),
          meta: {
            title: "Shifokor profili",
          },
        },
      ],
    },
    {
      path: "/auth",
      name: "authLayout",
      component: () => import("@/layouts/authLayout.vue"),
      children: [
        {
          path: "signup",
          name: "signup",
          component: () => import("@/views/auth/signUp-page.vue"),
        },
        {
          path: "",
          name: "login",
          component: () => import("@/views/auth/logIn-page.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("@/views/defaults/errorPage.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = `Hospital | ${to.meta?.title || "Sahifa"}`;

  console.log("Navigating to:", to.name);
  console.log("Current auth state:", store.state.auth.isAuth); // Log the auth state

  if (
    ["login", "signup", "authLayout"].includes(to.name) ||
    store.state.auth.isAuth
  ) {
    next();
  } else {
    if ($cookies.isKey("hospital_token")) {
      console.log("Token found, checking user status...");
      try {
        await store.dispatch("checkUser");
        console.log("Current auth state after checkUser:", store.state.auth.isAuth); // Log again after checkUser
        if (store.state.auth.isAuth) {
          next();
        } else {
          next({ name: "login" });
        }
      } catch (error) {
        console.error("Failed to check user:", error);
        next({ name: "login" });
      }
    } else {
      next({ name: "login" });
    }
  }
});



export default router;
