import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeScreen from '@/screens/HomeScreen.vue';
import HabitScreen from '@/screens/HabitScreen.vue';
import CreateHabitScreen from '@/screens/CreateHabitScreen.vue';
import EditHabitScreen from '@/screens/EditHabitScreen.vue';
import SettingsScreen from '@/screens/SettingsScreen.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home-screen',
    component: HomeScreen,
  },
  {
    path: '/habit/create',
    name: 'create-habit-screen',
    component: CreateHabitScreen,
  },
  {
    path: '/habit/:id',
    name: 'habit-screen',
    component: HabitScreen,
  },
  {
    path: '/habit/:id/edit',
    name: 'edit-habit-screen',
    component: EditHabitScreen,
  },
  {
    path: '/settings',
    name: 'settings-screen',
    component: SettingsScreen,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
