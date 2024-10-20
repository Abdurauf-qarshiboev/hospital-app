<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Tizimga kirish</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="login">

                <div>
                    <label for="login" class="block text-sm font-medium leading-6 text-gray-900">Login</label>
                    <div class="mt-2">
                        <input v-model="user.login" id="login" name="login" type="text" required="" class="input" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Parol</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">parolni unutdingizmi?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input v-model="user.password" id="password" name="password" type="password" required="" class="input" />
                    </div>
                </div>

                <div>
                    <button type="submit" class="submit-btn">Kirish</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Akkaunt yo`qmi?
                {{ ' ' }}
                <router-link :to="{name: 'signUp'}" href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Ro`yxatdan o`ting</router-link>
            </p>
        </div>
    </div>
    <notification :show="show" :title="title" :text="text" :status="status" @close="close"></notification>
</template>

<script>
import { api } from "@/helpers/api.js";
import notification from '@/components/layouts/notification.vue';
import router from "@/router";

export default {
    components: {
        notification
    },
    data: () => ({
        user: {},
        show: false,
        title: '',
        text: '',
        status: 'success'
    }),
    methods: {
        close() {
            this.show = false;
            this.title = '';
            this.text = '';
            this.status = 'success';
        },
        async login() {
            const { data } = await api.post('auth/login', this.user).catch(e => {
                console.error('error', e);
                this.title = 'Tizimga kirishda xatolik yuz berdi!';
                this.text = e.response.data;
                this.show = true;
                this.status = 'exist';
                setTimeout(() => {
                    this.close();
                }, 2000);
            });

            localStorage.setItem('hospital_token', data.token);
            this.$router.push({name: 'homepage'})
            console.log(data);
        },
    }
}
</script>

<style>
</style>
