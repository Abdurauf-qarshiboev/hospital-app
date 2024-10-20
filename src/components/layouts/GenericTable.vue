<template>
<div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
        <thead>
            <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">&#8470</th>
                <th v-for="(col, index) in columns" :key="index" class="py-3.5 text-center text-sm font-semibold text-gray-900">
                    {{ col.label }}
                </th>
                <th class="relative py-3.5 pl-1 pr-4 sm:pr-0">
                    <span class="sr-only">Actions</span>
                </th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in data" :key="item._id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {{ index + 1 }}
                </td>
                <td v-for="(col, i) in columns" :key="i" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                <template v-if="col.key === 'status'">
                    <span :class="getStatusClass(item.status)">
                        {{ item.status === 1 ? 'Active' : 'Inactive' }}
                    </span>
                </template>
                <template v-else-if="col.key === 'createdTime'">
                    {{ formatDate(item.createdTime) }}
                </template>
                <template v-else>
                    {{ item[col.key] }}
                </template>
            </td>
                <td class="relative whitespace-nowrap py-4 pl-1 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button @click="edit(item._id)"class="mr-2 text-indigo-600 hover:text-indigo-900">
                        <PencilSquareIcon class="text-indigo-500 size-5"></PencilSquareIcon>
                        <span class="sr-only">, {{ item.title }}</span>
                    </button>
                    <button @click="remove(item._id)" class="text-indigo-600 hover:text-indigo-900">
                        <TrashIcon class="text-red-500 size-5"></TrashIcon>
                        <span class="sr-only">, {{ item.title }}</span>
                    </button> 
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</div>
</template>

<script>
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';

export default {
components: {
        TrashIcon,
        PencilSquareIcon
},
props: {
    data: Array,
    columns: Array,
},
methods: {
    remove(id) {
        if (confirm("Are you sure to remove?")) {
            this.$emit('remove', id);
        }
    },
    edit(id) {
        if (confirm("Are you sure to edit?")) {
            this.$emit('edit', id);
        }
    },
    getStatusClass(status) {
        return status === 1 ? 'text-green-600' : 'text-red-600';
    },
    formatDate(givendate) {
        const date = new Date(givendate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
},
};
</script>

<style></style>
