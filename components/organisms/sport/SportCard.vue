<script lang="ts" setup>
type ISportType = {
  url: string;
  image: string;
  name: string;
};

defineProps({
  sportInfo: {
    type: Object as PropType<ISportType>,
    required: true,
  },
  size: {
    type: String as PropType<"large" | "small">,
    default: "small",
  },
  additionalClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="`group relative ${size === 'large' ? 'h-[410px] w-[350px]' : 'h-[300px] w-[256px]'} ${additionalClass}`">
    <NuxtLink :to="sportInfo.url">
      <Image
        :src="sportInfo.image"
        class="transition-transform duration-200 group-hover:scale-[1.05]"
        :alt="sportInfo.name"
        :show-placeholder="false"
      />
      <div
        class="absolute inset-0 m-auto flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <Button class="h-10 text-[18px]" variant="secondary">Cược Ngay</Button>
      </div>
    </NuxtLink>
  </div>
</template>
