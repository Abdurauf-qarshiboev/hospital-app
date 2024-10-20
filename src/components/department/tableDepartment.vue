<template >
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">&#8470</th>
                <th scope="col" class="px-2 py-3.5 text-sm font-semibold text-gray-900 text-center">Bo`lim nomi</th>
                <th scope="col" class="px-2 py-3.5 text-sm font-semibold text-gray-900 text-center">Bo`lim boshlig`i</th>
                <th scope="col" class="px-2 py-3.5 text-sm font-semibold text-gray-900 text-center">Holati</th>
                <th scope="col" class="px-2 py-3.5 text-sm font-semibold text-gray-900 text-center">Ochilgan vaqti</th>
                <th scope="col" class="relative py-3.5 pl-1 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item,index in data" :key="item._id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ index + 1 }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ item.title }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ item.boss }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                  <span :class="item.status === 1 ? 'text-green-600' : 'text-red-600'">
                    {{ item.status === 1 ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ item.createdTime }}</td>
                <td class="relative whitespace-nowrap py-4 pl-1 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button href="#" class="mr-2 text-indigo-600 hover:text-indigo-900">
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
    props: ['data'],
    methods: {
        remove(id) {
            if (confirm("Are you sure?")) {
                this.$emit('remove',id)
            }
        }
    }, 
}
</script>
<style >
    
</style>