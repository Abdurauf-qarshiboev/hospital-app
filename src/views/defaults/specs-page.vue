<template >
    <headPart />
    <modalSpecs />
    <tableSpecs :columns="columns"/>
</template>
<script>
import modalSpecs from '@/components/spec/modalSpecs.vue';
import tableSpecs from '@/components/spec/tableSpecs.vue';
export default {
    components: {
        modalSpecs,
        tableSpecs
    },
    data: () => ({
    columns: [
        { key: "title", label: "Mutaxassislik nomi" },
        { key: "createdTime", label: "Ochilgan vaqti" },
        { key: "status", label: "Holati" },
        ]
    })
}
</script>
<style >
    
</style>