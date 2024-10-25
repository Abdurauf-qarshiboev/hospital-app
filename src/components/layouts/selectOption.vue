<template>
    <Listbox as="div" v-model="selected" @change="onSelect">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Bo`limni tanlang</ListboxLabel>
        <div class="relative mt-2">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span class="block truncate">{{ selected?.title || 'Tanlanmagan' }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-50 mt-1 max-h-60 w-full overflow-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption v-for="department in departments" :key="department._id" :value="department" v-slot="{ active, selected }">
                        <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4']">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ department.title }}</span>
                            <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

export default {
    components: {
        CheckIcon,
        ChevronUpDownIcon,
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
    },
    props: {
        departments: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selected: null,
        };
    },
    methods: {
        onSelect(selectedDepartment) {
            this.selected = selectedDepartment;
            this.$emit('select', selectedDepartment);
        },
    },
};
</script>

<!-- <template>
  <select @change="handleSelect">
    <option v-for="department in departments" :key="department._id" :value="department._id">
      {{ department.title }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    departments: Array,
  },
  methods: {
    handleSelect(event) {
      const selectedId = event.target.value;
      const selectedDepartment = this.departments.find(dep => dep._id === selectedId);
      this.$emit('select', selectedDepartment); // Emit the whole department object
    },
  },
};
</script> -->
