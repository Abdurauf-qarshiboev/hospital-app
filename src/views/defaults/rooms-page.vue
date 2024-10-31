<template>
    <headPart />
    <tableRooms :columns="columns"/>
    <modalRooms />
</template>

<script>
import modalRooms from '@/components/room/modalRooms.vue';
import tableRooms from '@/components/room/tableRooms.vue';
export default {
  components: {
    modalRooms,
    tableRooms
  },
  data: () => ({
    columns: [
      { key: "number", label: "Xona raqami" },
      { key: "department", label: "Bo`lim" },
      { key: "maxcount", label: "Xona sig`imi" },
      { key: "status", label: "Holati" },
    ]
  })
};
</script>

<style></style>
