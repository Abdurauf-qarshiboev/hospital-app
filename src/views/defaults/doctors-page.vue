<template>
    <headPart />
    <modalDoctors />
    <tableDoctors />
</template>
<script>
import tableDoctors from '@/components/doctors/tableDoctors.vue';
import modalDoctors from '@/components/doctors/modalDoctors.vue';
export default {
    components: {
        modalDoctors,
        tableDoctors
    },
    async mounted() {
        await this.$store.dispatch('allSpecs')
        await this.$store.dispatch('allDepartments')
    }
}
</script>
<style>

</style>