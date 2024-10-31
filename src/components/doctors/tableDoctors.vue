<template>
    <ul role="list"
        class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <li v-for="person in doctors" :key="person._id">
            <router-link :to="{ name: 'doctor-show', params: { id: person._id } }">
                <img v-if="person?.file?.length > 0" class="aspect-[3/2] w-full rounded-2xl object-cover"
                    :src="`${url}/${person.file?.at(0)}`" alt="" />
                <img v-else class="aspect-[3/2] w-full rounded-2xl object-cover" src="@/assets/imgs/user.png" alt="" />
            </router-link>
            <router-link :to="{ name: 'doctor-show', params: { id: person._id } }">
                <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ person.name }}</h3>
            </router-link>
            <p class="text-base leading-7 text-gray-600">{{ person?.spec?.title || person.spec || '' }}</p>
            <p class="text-base leading-7 text-gray-600">{{ person?.department?.title || person.department || '' }}
            </p>
            <button @click="remove(person._id)">
                <TrashIcon class="size-5 text-red-500" />
            </button>
        </li>
    </ul>
    <el-confirm title="Doktor ma`lumotlari o`chirmoqchisiz?" text="O`chirilgan ma`lumot qayta tiklanmaydi."
        @response="confirmRemove" />
</template>

<script>
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { mapActions, mapGetters } from 'vuex';
import { url } from '@/helpers/api'
export default {
    components: { TrashIcon, PencilIcon },
    data: () => ({
        url
    }),
    computed: {
        ...mapGetters(['activeDepartments', 'doctors'])
    },
    methods: {
        ...mapActions(['allDoctors', 'removeDoctor', 'changeStatusDoctor', 'allDepartments']),
        async confirmRemove(value) {
            if (value) {
                await this.removeDoctor(this.id)
                this.id = ''
            }
        },
        edit(id) {
            this.$store.commit('setEdit', {
                id,
                editToggle: true
            })
            this.$store.commit('setToggle', true)
        },
        remove(_id) {
            console.log(_id);
            this.id = _id
            this.$store.commit('setConfirmToggle', true)
        }
    },
    async mounted() {
        await this.allDoctors()
    }
}
</script>