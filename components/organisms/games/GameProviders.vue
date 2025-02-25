<script lang="ts" setup>
type IProps = {
  providers: IProvider[];
};

const props = withDefaults(defineProps<IProps>(), {
  providers: () => [],
});

const route = useRoute();
const { $device } = useNuxtApp();
const { scrollContainerRef, scrollTo } = useScrollTo("horizontal");

const customProviders = computed(() => {
  return props.providers.length >= 2
    ? [
        {
          code: ALL_PROVIDER_QUERY,
          name: "Tất cả",
          url: "/",
          img: "",
        },
        ...props.providers,
      ]
    : [...props.providers];
});

const selectedProvider = computed<IProvider | undefined>(() => {
  const value = (route.query?.provider as string) || ALL_PROVIDER_QUERY;
  return customProviders.value.find((el) => el.code === getOriginProviderCode(value));
});

const handleSelectProvider = async (index: number, provider?: IProvider) => {
  if (selectedProvider.value?.code === provider?.code) return;

  const isAllProviders = provider?.code === "all";

  // Construct the query object without provider when providerCode is 'all'
  const query: Record<string, string | undefined> = { ...route.query, sort: undefined };

  if (!isAllProviders) {
    query.provider = getRenamedProviderCode(provider?.code);
  } else {
    // delete query when providerCode is 'all'
    delete query.provider;
  }

  await navigateTo({ query });
};

watch(selectedProvider, (provider) => {
  const index = customProviders.value.findIndex((el) => el.code === provider?.code);
  if (index >= 0) scrollTo(index);
});
const checkIsActiveProvider = (providerCode: string) => {
  return selectedProvider.value?.code === providerCode || customProviders.value.length === 1;
};
</script>

<template>
  <div
    ref="scrollContainerRef"
    class="flex items-center gap-2"
    :class="[
      $device.isMobileOrTablet
        ? 'no-scrollbar flex-nowrap overflow-x-scroll'
        : 'flex-wrap rounded-2xl bg-black bg-opacity-5',
    ]"
  >
    <div v-if="customProviders.length === 1" class="mx-3 flex justify-center text-sm font-medium">Nhà Cung Cấp</div>
    <Button
      v-for="(provider, index) in customProviders"
      :key="index"
      class="relative h-9 min-w-11 overflow-hidden px-3 py-1"
      :class="{
        'flex-shrink-0': $device.isMobileOrTablet,
        'hover:bg-neutral-800/50 active:bg-neutral-800/50': selectedProvider?.code !== provider.code,
      }"
      :variant="checkIsActiveProvider(provider.code) ? 'default' : 'dark'"
      @click="handleSelectProvider(index, provider)"
    >
      <p v-if="provider.code === 'all'">
        {{ provider.name }}
      </p>

      <Image
        v-else
        :src="provider.img"
        :alt="provider.name"
        height="100%"
        :show-placeholder="false"
        show-spinner
        img-class="object-contain w-auto"
      />
    </Button>
  </div>
</template>
