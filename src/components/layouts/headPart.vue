<template >
<div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {{$route?.meta?.title}}
        </h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
        <button
            @click="$emit('changeShow',true)"
            type="button"
            class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
            Yangi {{ $route?.meta?.title.slice(0,$route?.meta?.title.length-3)?.toLocaleLowerCase() }}
        </button>
    </div>
</div>
</template>
<script>
export default {
}
</script>
<style >
    
</style>