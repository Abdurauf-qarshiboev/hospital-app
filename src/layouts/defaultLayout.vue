<template>
    <defaultSidebar></defaultSidebar>
    <div class="lg:pl-72">
        <defaultHeader></defaultHeader>
        <main class="py-10">
            <div class="px-4 sm:px-6 lg:px-8">
                <router-view></router-view>
            </div>
        </main>
    </div>
    <notification :show="show" :title="title" status="exist"></notification>
</template>

<script>
import { api } from '@/helpers/api';
import defaultHeader from '@/components/dashboard/defaultHeader.vue';
import defaultSidebar from '@/components/dashboard/defaultSidebar.vue';
import notification from '@/components/layouts/notification.vue';

export default {
    components: {
        defaultHeader,
        defaultSidebar,
        notification
    },
    data: () => ({
        show: false,
        title: ''
    }),
    mounted() {
        const token = localStorage.getItem('hospital_token');
        if (token) {
            api.post('auth/checkuser')
                .catch(e => {
                    if (e.status == 401) {
                        this.show = true;
                        this.title = 'Tizimga kirish inkor etildi!';
                        setTimeout(() => {
                            localStorage.removeItem('hospital_token');
                            this.$router.push({ name: 'logIn' });
                        }, 1000);
                    }
                });
        } else {
            this.$router.push({ name: 'logIn' });
        }
    }
}
</script>

<style>
    
</style>
