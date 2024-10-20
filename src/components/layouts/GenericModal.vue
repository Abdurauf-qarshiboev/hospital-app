<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @close="close">
        <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                    <DialogTitle class="text-base font-semibold leading-6 text-gray-900">{{ title }}</DialogTitle>
                    <div class="mt-2">
                        <slot></slot> 
                    </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:flex sm:justify-between sm:gap-3">
                    <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                        @click="close"
                    >
                        {{ cancelText }}
                    </button>
                    <button
                        type="button"
                        
                        class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:mr-2"
                        @click="confirm"
                    >
                        {{ confirmText }}
                    </button>
                </div>

                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

export default {
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot
    },
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "Modal Title",
        },
        confirmText: {
            type: String,
            default: "Confirm",
        },
        cancelText: {
            type: String,
            default: "Cancel",
        },
    },
    methods: {
        close() {
        this.$emit("close");
        },
        confirm() {
        this.$emit("confirm");
        this.close();
        },
    },
};
</script>

<style></style>
