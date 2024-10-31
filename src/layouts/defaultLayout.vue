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
import defaultHeader from '@/components/dashboard/defaultHeader.vue';
import defaultSidebar from '@/components/dashboard/defaultSidebar.vue';

export default {
    components: {
        defaultHeader,
        defaultSidebar,
        
    },
    data: () => ({
        show: false,
        title: ''
    }),
}
</script>

<style>
    
</style>
