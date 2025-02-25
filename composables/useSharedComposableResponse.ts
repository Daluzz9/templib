export const useSharedComposableResponse = createSharedComposable(<T>() => {
  const composableResponse = ref<T | null>(null);
  const setComposableResponse = (response: T) => {
    composableResponse.value = response;
  };

  return { composableResponse, setComposableResponse };
});
