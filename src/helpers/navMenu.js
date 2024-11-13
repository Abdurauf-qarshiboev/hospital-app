import {
    RectangleStackIcon,
    HomeIcon,
    UsersIcon,
    RectangleGroupIcon,
    BriefcaseIcon,
    SwatchIcon
} from '@heroicons/vue/24/outline'
export const navMenu = [
  {
    path: "",
    name: "dashboard-page",
    component: () => import("@/views/defaults/dashboard-page.vue"),
    meta: {
      title: "Bosh sahifa",
      icon: HomeIcon,
    },
  },
  {
    path: "departments",
    name: "departments",
    component: () => import("@/views/defaults/departments-page.vue"),
    meta: {
      title: "Bo`limlar",
      icon: RectangleGroupIcon,
    },
  },
  {
    path: "rooms",
    name: "rooms",
    component: () => import("@/views/defaults/rooms-page.vue"),
    meta: {
      title: "Xonalar",
      icon: RectangleStackIcon,
    },
  },
  {
    path: "specs",
    name: "specs",
    component: () => import("@/views/defaults/specs-page.vue"),
    meta: {
      title: "Mutaxassisliklar",
      icon: BriefcaseIcon,
    },
  },
  {
    path: "positions",
    name: "positions",
    component: () => import("@/views/defaults/positions-page.vue"),
    meta: {
      title: "Lavozimlar",
      icon: SwatchIcon,
    },
  },
  {
    path: "doctors",
    name: "doctors",
    component: () => import("@/views/defaults/doctors-page.vue"),
    meta: {
      title: "Shifokorlar",
      icon: UsersIcon,
    },
  },
];