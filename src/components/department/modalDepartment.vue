<template>
<el-dialog>
        <DialogPanel
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
                <div>
                    <DialogTitle as="h3" class="text-lg  font-semibold leading-6 text-gray-900">Yangi
                        bo'lim</DialogTitle>
                    <div class="mt-2">
                        <el-input v-model="data.title" label="Bo`lim nomi" name="department" />
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="button"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    @click="add">Saqlash</button>
                <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="close" ref="cancelButtonRef">Bekor qilish</button>
            </div>
        </DialogPanel>
    </el-dialog>
</template>

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { mapActions } from 'vuex';
export default {
    components: {
        Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, CheckIcon
    },
    data: () => ({
        data: {}
    }),
    computed: {
        toggle() {
            return this.$store.getters.toggle
        },
        id() {
            return this.$store.getters.id
        },
        editToggle() {
            return this.$store.getters.editToggle
        }
    },
    watch: {
        async toggle(to) {
            if (to && this.id?.length > 0 && this.editToggle) {
                await this.getTheDepartment(this.id)
            } else {
                this.data = {}
            }
        }
    },
    methods: {
        ...mapActions(['newDepartment', 'getDepartment', 'saveDepartment']),
        close() {
            this.$store.commit('setToggle', false)
        },
        async getTheDepartment(id) {
            const res = await this.getDepartment(id)
            this.data = { ...res.data }
        },
        add() {
            if (this.editToggle) {
                this.saveDepartment(this.data)
            } else {
                this.newDepartment(this.data)
            }
            this.close()
        }
    },
}
</script>