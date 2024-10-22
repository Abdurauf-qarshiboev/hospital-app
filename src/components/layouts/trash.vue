<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Bo'limlar</h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <button
        @click="changeShow(true)"
        type="button"
        class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
      >
        Yangi bo'lim
      </button>
    </div>
  </div>

  <GenericModal
    :open="show"
    title="Yangi bo'lim"
    @close="changeShow(false)"
    @confirm="add(neW)"
    confirmText="Saqlash"
    cancelText="Bekor qilish"
    :update="update"
  >
    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Bo'lim nomi</label>
    <input v-model="neW.title" id="title" name="title" type="text" required class="input" />
  </GenericModal>

  <GenericTable :data="list" :columns="columns" @remove="confirmRemove" @edit="confirmEdit"/>
  <notification :show="notif.show" :title="notif.title" :status="notif.status" @close="close"></notification>
  <alert
    :open="alertOpen"
    title="Bo`limni o`chirish"
    text="Rostdan ham bo`limni o`chirmoqchi ekanligingizni tasqiqlang! Tasdiqlash (O`chirish)ni bosing."
    @close="alertOpen = false"
    @confirm="alertConfirm"
    confirmText="O`chirish"
    cancelText="Bekor qilish"
  >
  </alert>
</template>

<script>
import GenericModal from "@/components/layouts/GenericModal.vue";
import GenericTable from "@/components/layouts/GenericTable.vue";
import notification from "@/components/layouts/notification.vue";
import alert from "@/components/layouts/alert.vue";
import { api } from "@/helpers/api";

export default {
  components: {
    GenericModal,
    GenericTable,
    notification,
    alert
  },
  data: () => ({
    show: false,
    list: [],
    notif: {
      show: false,
      title: "Yangi bo`lim qo`shildi!",
      status: 'success'
    },
    neW: {
      title: '',
    },
    columns: [
      { key: 'title', label: 'Bo`lim nomi' },
      { key: 'boss', label: 'Bo`lim boshlig`i' },
      { key: 'status', label: 'Holati' },
      { key: 'createdTime', label: 'Ochilgan vaqti' },
    ],
    update: {}
  }),
  methods: {
    async edit(id) {
      const { data } = await api.get(`department/${id}`);
      this.update = { ...data }; 
      this.neW = this.update;
      this.show = true; 
    },
    changeShow(val) {
      this.show = val
      if (!this.update) {
        this.update = {}
      }
    },
    // quit() {
    //   localStorage.removeItem('hospital_token');
    //   this.$router.push({ name: 'logIn' })
    // },
    async add(value) {
      if (value?._id) {
        const { data } = await api.put('department', value);
        this.list = this.list.map(item => {
          if (item._id == data._id) return data
          return item
        })
        this.showNotification('Ma`lumotlar yangilandi','success');
      }
      else {
        try {
          const { data } = await api.post("department", this.neW);
          this.list = [data, ...this.list];
          this.showNotification("Yangi bo`lim qo`shildi!");
          this.neW.title = ''
        } catch (error) {
          if (error.response?.data) {
            this.showNotification(error.response.data,'exist')
          } else {
            this.showNotification("Muammo yuz berdi...",'exist')
          }
        }
      }
    },
    async all() {
      const { data } = await api.get("department");
      this.list = data;
    },
    async remove(id) {
      try {
        await api.delete(`department/${id}`);
        this.list = this.list.filter(item => item._id !== id);
        this.showNotification('Bo`lim o`chirildi!',);
      }
      catch (error) {
        this.showNotification('Xato: Bo`limni o`chirishda muammo bor!','exist');
      }
    },
    showNotification(title,status) {
      this.notif.title = title;
      this.notif.show = true;
      this.notif.status = status;
      setTimeout(() => {
        this.notif.show = false;
      }, 3000);
    },
    close() {
      this.notif.show = false;
      this.notif.title = '';
      this.notif.status = 'success';
    },
  },
  async mounted() {
    await this.all();
  }
};
</script>

<style></style>
