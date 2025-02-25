/* eslint-disable @typescript-eslint/no-explicit-any */
// Persist feature to handle multiple tabs auth.
// Pinia store info can be save to localstorage
import { createPersistedState } from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  const { $pinia } = nuxtApp as Record<string, any>;
  $pinia.use(createPersistedState());
});
