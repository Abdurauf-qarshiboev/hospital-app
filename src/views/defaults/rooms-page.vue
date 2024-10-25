<template>
  <headPart @changeShow="changeShow"/>

  <GenericModal
    :open="show"
    title="Yangi xona"
    @close="changeShow(false)"
    @confirm="add(neW)"
    confirmText="Saqlash"
    cancelText="Bekor qilish"
    :update="update"
  >
    <div class="mt-2">
        <label for="number" class=" block text-sm font-medium leading-6 text-gray-900">Xona raqami</label>
        <input v-model="neW.number" id="number" name="number" type="number" required class="input" />
    </div>
    <div class="mt-2">
        <selectOption :departments="departments" @select="selectDepartment" />
    </div>
    <div class="mt-2">
        <label for="maxcount" class=" block text-sm font-medium leading-6 text-gray-900">Xona sig`imi</label>
        <input v-model="neW.maxcount" id="maxcount" name="maxcount" type="maxcount" required class="input" />
    </div>
    
  </GenericModal>

  <GenericTable :room="room" :data="list" :columns="columns" @remove="remove" @edit="edit" @status="changeStatus"/>
  <notification :show="notif.show" :title="notif.title" :status="notif.status" @close="close"></notification>
  <!-- <alert
    :open="show"
    title="Bo`limni o`chirish"
    text="Rostdan ham bo`limni o`chirmoqchi ekanligingizni tasqiqlang! Tasdiqlash (O`chirish)ni bosing."
    @close="changeShow(false)"
    @confirm="delete"
    confirmText="O`chirish"
    cancelText="Bekor qilish"
  >
  </alert> -->
</template>

<script>
import GenericModal from "@/components/layouts/GenericModal.vue";
import GenericTable from "@/components/layouts/GenericTable.vue";
import notification from "@/components/layouts/notification.vue";
import headPart from "@/components/layouts/headPart.vue";
import selectOption from "@/components/layouts/selectOption.vue";
// import alert from "@/components/layouts/alert.vue";
import { api } from "@/helpers/api";
import HeadPart from "@/components/layouts/headPart.vue";

export default {
  components: {
    GenericModal,
    GenericTable,
    notification,
    headPart,
    selectOption,
    // alert
  },
  data: () => ({
    show: false,
      list: [],
    departments: [],
    notif: {
      show: false,
      title: "Yangi xona qo`shildi!",
      status: 'success'
    },
    neW: {
        number: null,
        title: '',
        department: {_id : null},
        maxcount: null
    },
    columns: [
      { key: 'number', label: 'Xona raqami' },
      { key: 'department', label: 'Bo`lim', formatter: (item) => item.department ? item.department.title : 'No Department' },
      { key: 'maxcount', label: 'Xona sig`imi' },
      { key: 'status', label: 'Holati' },
      { key: 'createdTime', label: 'Ochilgan vaqti' },
    ],
    update: {}
  }),
  methods: {
    async changeStatus(id) {
      const { data } = await api.get(`room/${id}`);
      const res = await api.put('room', {
        _id: id,
        status: data.status == 1 ? 0 : 1
      })
      this.list = this.list.map(item => {
        if (item._id == res.data._id) return res.data
        return item
      })
      this.showNotification('Xona holati yangilandi','success');
    },
    async edit(id) {
        const { data } = await api.get(`room/${id}`);
        this.update = { ...data }; 
        this.neW = { ...data };
        this.show = true; 
    },
    changeShow(val) {
      this.show = val
      if (!val) {
        this.resetForm();
      }
    },
    // quit() {
    //   localStorage.removeItem('hospital_token');
    //   this.$router.push({ name: 'logIn' })
    // },
    async add(value) {
        if (value?._id) {
            const { data } = await api.put('room', value);
            this.list = this.list.map(item => {
                if (item._id == data._id) return data
                return item
            })
            this.update = {}
            this.neW = {}
            this.showNotification('Ma`lumotlar yangilandi','success');
        }
        else {
            if (!this.neW) {
                this.showNotification("Bo'lim biriktirilmagan", 'exist');
                return; 
            }
            try {
                const { data } = await api.post("room", {
                    number: this.neW.number,
                    department: this.neW.department._id,
                    maxcount: this.neW.maxcount
                });
                console.log(data);
                
                this.list = [data, ...this.list];
                this.showNotification("Yangi xona qo`shildi!");
                this.resetForm();
                this.neW = { number: null, title: '', department: { _id: null }, maxcount: null }
            } catch (error) {
                if (error.response?.data) {
                    this.showNotification(error.response?.data.message,'exist')
                } else {
                    this.showNotification("Muammo yuz berdi...",'exist')
                }
            }
        }
    },
    async all() {
        const { data } = await api.get("room");
        const res = await api.get('department');
        this.departments = [...res.data];
        console.log(this.departments);
        this.list = [...data];
    },
    selectDepartment(department) {
        if (department) {
            this.neW.department = department; 
            console.log(this.neW);
            
            console.log("Selected department ID:", this.neW.department._id);
        } else {
            console.log("No department selected.");
        }
    },
    async remove(id) {
      try {
        await api.delete(`room/${id}`);
        this.list = this.list.filter(item => item._id !== id);
        this.showNotification('Xona o`chirildi!',);
      }
      catch (error) {
        this.showNotification('Xato: Xonani o`chirishda muammo bor!','exist');
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
    resetForm() {
        this.neW = {
            number: null,
            title: '',
            department: { _id: null },
            maxcount: null,
        };
        this.update = {};
    },
  },
  async mounted() {
    await this.all();
  }
};
</script>

<style></style>
