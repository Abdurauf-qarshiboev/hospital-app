<template >
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          Hospital
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                  <router-link
                  v-for="item in navigation" :key="item.to" :to="{name: item.to}" :class="[$route.name == item.to ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" :class="[$route.name == item.to ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
              </ul>
            </li>
            <!-- teams -->
            <li>
              <div class="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li v-for="team in teams" :key="team.name">
                  <a :href="team.href" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ team.initial }}</span>
                    <span class="truncate">{{ team.name }}</span>
                  </a>
                </li>
              </ul>
            </li>
            <!-- setttings -->
            <li class="mt-auto">
              <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                <Cog6ToothIcon class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" aria-hidden="true" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
</template>

<script setup>

import {
  Cog6ToothIcon,
  RectangleStackIcon,
  HomeIcon,
  UsersIcon,
  RectangleGroupIcon,
  BriefcaseIcon,
  SwatchIcon
} from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Bosh sahifa', to: 'homepage', icon: HomeIcon },
  { name: "Bo`limlar", to: 'departments', icon: RectangleGroupIcon },
  // { name: 'Xonalar', to: 'rooms', href: '#', icon: RectangleStackIcon},
  { name: 'Mutaxassisliklar', to: 'specs', icon: BriefcaseIcon},
  // { name: 'Shifokorlar', to: 'doctors', href: '#', icon: UsersIcon},
  { name: 'Lavozimlar', to: 'positions', icon: SwatchIcon},
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: true },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

</script>
<style >
    
</style>