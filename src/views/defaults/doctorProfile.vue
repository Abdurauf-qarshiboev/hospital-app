<template>
    <div>
        <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-7 text-gray-900">Shifokor ma'lumoti</h3>

        </div>
        <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Ism-familiyasi</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ doctor.name }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">About</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt
                        culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                        consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                        pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                </div>

            </dl>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        doctor: {},
        id: ''
    }),
    async mounted() {
        if (this.$route.params?.id) {
            this.id = this.$route.params.id
            const { data } = await this.$store.dispatch('getDoctor', this.id)
            console.log(data);
            this.doctor = { ...data }
            document.title = `${this.doctor?.name} ma'lumotlari`
        }
    }
}
</script>
<style lang="">

</style>