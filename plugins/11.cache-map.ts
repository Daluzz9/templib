export default defineNuxtPlugin(() => {
  const cacheMap = useState("cache-map", () => new Map());

  const clearAll = () => {
    cacheMap.value.clear();
  };

  return {
    provide: {
      cacheMap,
      clearAll,
    },
  };
});
