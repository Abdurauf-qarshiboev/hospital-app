<template>
    <headPart/>
    <modalDepartment />
    <tableDepartment :columns="columns"/>
</template>
<script>
import modalDepartment from "@/components/department/modalDepartment.vue";
import tableDepartment from "@/components/department/tableDepartment.vue";
export default {
  components: {
    modalDepartment,
    tableDepartment,
  },
  data: () => ({
    columns: [
      { key: "title", label: "Bo`lim nomi" },
      { key: "createdTime", label: "Ochilgan vaqti" },
      { key: "status", label: "Holati" },
    ]
  })
};
</script>

<style></style>
