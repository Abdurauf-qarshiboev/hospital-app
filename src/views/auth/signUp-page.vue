<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Ro`yxatdan o`tish
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="reg">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Ism-familiya</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="user.name"
              id="name"
              name="name"
              type="text"
              required=""
              class="input"
            />
          </div>
        </div>

        <div>
          <label
            for="login"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Login</label
          >
          <div class="mt-2">
            <input
              v-model="user.login"
              id="login"
              name="login"
              type="text"
              required=""
              class="input"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Parol</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="user.password"
              @input="checkPassword"
              id="password"
              name="password"
              type="password"
              required=""
              class="input"
            />
            <p
              class="block text-sm text-red-500 font-medium leading-6 text-gray-900"
              :class="{
                'text-green-500': point === 4,
                'text-blue-400': point === 3,
                'text-yellow-400': point === 2,
                'text-orange-400': point === 1,
                'text-red-500': point === 0
              }"
            >
              {{ notif }}
            </p>
          </div>
        </div>

        <div>
          <button type="submit" class="submit-btn">Ro`yxatdan o`tish</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Akkaunt bormi?
        {{ " " }}
        <router-link :to="{name: 'logIn'}"
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Tizimga kiring</router-link>
      </p>
    </div>
  </div>
  <notification
    :show="show"
    :title="title"
    :text="text"
    :status="status"
    @close="close"
  ></notification>
</template>

<script>
import { api } from "@/helpers/api.js";
import notification from "@/components/layouts/notification.vue";

export default {
  components: {
    notification,
  },
  data: () => ({
    user: {},
    show: false,
    title: "",
    text: "",
    point: null,
    notif: "",
    status: "success",
  }),
  methods: {
    close() {
      this.show = false;
      this.title = "";
      this.text = "";
      this.status = "success";
    },
    async reg() {
      try {
        const { data } = await api.post("auth/reg", this.user);
        console.log(data);
        if (data === "exist") {
          this.title = "Bunday foydalanuvchi mavjud!";
          this.text = "Iltimos boshqa login bilan urinib koring.";
          this.show = true;
          this.status = "exist";
          setTimeout(() => {
            this.close();
          }, 2000);
        }
        if (data === "success") {
          this.title = "Muvaffaqiyatli ro`yxatdan o`tdingiz!";
          this.text = "Tizimga kirishingiz mumkin.";
          this.show = true;
          this.status = "success";
          setTimeout(() => {
            this.close();
          }, 2000);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.title = "Xato";
        this.text = "Ro'yxatdan o'tishda xato yuz berdi.";
        this.show = true;
        this.status = "exist";
        setTimeout(() => {
          this.close();
        }, 2000);
      }
    },
    letterCount() {
      let letterMatch = this.user.password.match(/[a-zA-Z]/g);
      return letterMatch ? letterMatch.length : 0;
    },
    charCount() {
      let specialMatch = this.user.password.match(/[!@#$%&*(?/)]/g);
      return specialMatch ? specialMatch.length : 0;
    },
    numCount() {
      let numMatch = this.user.password.match(/\d/g);
      return numMatch ? numMatch.length : 0;
    },
    lengthCheck() {
      return this.user.password.length >= 8;
    },
    checkPassword() {
      this.point = 0;
      if (this.numCount() >= 3) this.point++;
      if (this.letterCount() >= 2) this.point++;
      if (this.charCount() >= 1) this.point++;
      if (this.lengthCheck()) this.point++;
      this.displayLevel();
      this.clear();
    },
    clear() {
      if (this.user.password.length == 0) {
        this.notif = "";
      }
    },
    displayLevel() {
      switch (this.point) {
        case 4:
          this.notif = "Sizning parolingiz kuchli !!!";
          break;
        case 3:
          this.notif = "Sizning parolingiz yaxshi !!";
          break;
        case 2:
          this.notif = "Sizning parolingiz qoniqarli !";
          break;
        case 1:
          this.notif = "Sizning parolingiz kuchsiz :(";
          break;
        default:
          this.notif = "Iltimos, amal qiladigan parol kiriting!";
      }
    },
  },
};
</script>

<style></style>
