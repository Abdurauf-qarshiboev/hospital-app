import { api } from "@/helpers/api";
import router from "@/router";

export const auth = {
  state: () => ({
    user: {},
    isAuth: false,
  }),
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
          state.user = { ...payload };
          console.log("User set:", state.user);
    },
    setIsAuth(state, payload) {
        state.isAuth = payload;
        console.log("Auth state set:", state.isAuth);
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const { data } = await api.post("auth/login", payload);
        commit("setUser", data.user);
        commit("setIsAuth", true);
        $cookies.set("hospital_token", data.token);
        router.push({ name: "dashboard-page" });
      } catch (e) {
        console.error("Login error:", e);
        commit("setNotif", {
          title: "Tizimda kirishda xatolik bo`ldi",
          text: e.response?.data,
          status: "warning",
        });
      }
    },
    async checkUser({ commit }) {
      try {
        const { data } = await api.post("auth/checkuser");
        commit("setUser", data);
        commit("setIsAuth", true);
      } catch (e) {
        console.error("Error checking user:", e);
        if (e.response && e.response.status == 401) {
          $cookies.remove("hospital_token");
          commit("setIsAuth", false);
          router.push({ name: "login" });
        }
      }
    },
    async reg({ commit }, payload) {
      const { data } = await api.post("auth/reg", payload);
      if (data == "exist")
        commit("setNotif", {
          title: "Bunday foydalanuvchi mavjud",
          text: "Iltimos boshqa login yozing.",
          status: "warning",
        });
      if (data == "success") {
        commit("setNotif", {
          title: "Muvafaqqiyatli ro`yhatdan o`tdingiz",
          text: "Tizimga login parolingiz kirishingiz mumkin.",
        });
        router.push({ name: "login" });
      }
    },
    logout({ commit }) {
      $cookies.remove("hospital_token");
      commit("setIsAuth", false);
      commit("setUser", {});
      commit("setNotif", {
        title: "Tizimdan chiqdingiz",
        status: "warning",
      });
      router.push({ name: "login" });
    },
  },
};
