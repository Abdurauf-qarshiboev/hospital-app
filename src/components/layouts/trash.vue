<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        Bo'limlar
      </h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <button
        @click="changeShow(true)"
        type="button"
        class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Yangi bo'lim
      </button>
    </div>
    
  </div>
  <modalDepartment
    :show="show"
    @close="changeShow(false)"
    @add="add"
  ></modalDepartment>
  <table-department :data="list" @remove="remove"></table-department>
  <notification :show="notif.show" :title="notif.title"></notification>
</template>

<script>
import modalDepartment from "@/components/department/modalDepartment.vue";
import tableDepartment from "@/components/department/tableDepartment.vue";
import notification from "@/components/layouts/notification.vue";
import { api } from "@/helpers/api";

export default {
  components: {
    modalDepartment,
    tableDepartment,
    notification,
  },
  data: () => ({
    show: false,
    list: [],
    notif: {
      show: false,
      title: "Yangi bo`lim qo`shildi!",
    },
  }),
  methods: {
    changeShow(val) {
      this.show = val;
    },
    async add(value) {
      const { data } = await api.post("department", value);
      this.list = [data, ...this.list];
      this.showNotification("Yangi bo`lim qo`shildi!");
    },
    async all() {
      const { data } = await api.get("department");
      this.list = data;
    },
    async remove(id) {
        try {
            await api.delete(`department/${id}`);
            this.list = this.list.filter(item => item._id !== id);
            this.showNotification('Bo`lim o`chirildi!');
        } catch (error) {
            this.showNotification('Xato: Bo`limni o`chirishda muammo bor!');
        }
    },
    showNotification(title) {
      this.notif.title = title;
      this.notif.show = true;
      setTimeout(() => {
        this.notif.show = false;
      }, 2000);
    },
  },
  async mounted() {
    await this.all();
  }
};
</script>

<style>
</style>
