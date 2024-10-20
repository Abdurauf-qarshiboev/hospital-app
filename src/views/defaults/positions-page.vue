<template>
<div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Lavozimlar</h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
    <button
        @click="changeShow(true)"
        type="button"
        class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
    >
        Yangi lavozim
    </button>
    </div>
</div>

<GenericModal
    :open="show"
    title="Yangi lavozim"
    @close="changeShow(false)"
    @confirm="add"
    confirmText="Saqlash"
    cancelText="Bekor qilish"
>
    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Lavozim nomi</label>
    <input v-model="neW.title" id="title" name="title" type="text" required class="input" />
</GenericModal>

<GenericTable :data="list" :columns="columns" @remove="remove" />
<notification :show="notif.show" :title="notif.title" :status="notif.status" @close="close"></notification>
</template>

<script>
import GenericModal from "@/components/layouts/GenericModal.vue";
import GenericTable from "@/components/layouts/GenericTable.vue";
import notification from "@/components/layouts/notification.vue";
import { api } from "@/helpers/api";

export default {
    components: {
        GenericModal,
        GenericTable,
        notification,
    },
    data: () => ({
        show: false,
        list: [],
        notif: {
            show: false,
            title: "Yangi lavozim qo`shildi!",
            status: 'success'
        },
        neW: {
            title: '',
        },
        columns: [
        { key: 'title', label: 'Lavozim nomi' },
        { key: 'status', label: 'Holati' },
        { key: 'createdTime', label: 'Yaratilgan vaqti' },
        ],
    }),
    methods: {
        changeShow(val) {
        this.show = val;
        },
        async add() {
            if (this.neW.title.length !== 0) {
                try {
                    const { data } = await api.post("position", this.neW);
                    this.list = [data, ...this.list];
                    this.showNotification("Yangi lavozim qo`shildi!",'success');
                    this.neW.title = '';
                } catch (error) {
                    if (error.response && error.response.data) {
                        this.showNotification(error.response.data,'exist');
                    } else {
                        this.showNotification("Muammo yuz berdi...",'exist');
                    }
                }
            } else {
                this.showNotification("Lavozim nomi kiritilmagan",'exist');
            }
        },
        async all() {
            const { data } = await api.get("position");
            this.list = data;
        },
        async remove(id) {
            try {
                await api.delete(`position/${id}`);
                this.list = this.list.filter(item => item._id !== id);
                this.showNotification('Lavozim o`chirildi!','success');
            } catch (error) {
                this.showNotification('Xato: Lavozimni o`chirishda muammo bor!','exist');
            }
        },
        showNotification(title,status) {
            this.notif.title = title;
            this.notif.status = status;
            this.notif.show = true;
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
