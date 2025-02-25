<script setup lang="ts">
import { contactList, supportList } from "./static";
</script>

<template>
  <div class="px-3 pb-3 pt-2">
    <section class="pb-2">
      <div class="grid grid-cols-2 gap-3">
        <div v-for="card in supportList" :key="card.title">
          <CategoryCard
            :suffix="card.suffix"
            :title="card.title"
            :class="`h-[102px] ${card.background} bg-cover bg-center p-3`"
          >
            <template #title>
              <p class="min-w-[77px] text-xs">{{ card.title }}</p>
            </template>
            <template #suffix>
              <Image :src="card.suffix" height="64px" width="64px" />
            </template>
          </CategoryCard>
        </div>
      </div>
    </section>
    <div class="py-2">
      <p class="pb-2">Liên Hệ</p>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="card in contactList" :key="card.title">
          <CategoryCard :prefix="card.prefix" :title="card.title" />
        </div>
      </div>
    </div>
    <div>
      <CategoryCard
        prefix="support/chat.webp"
        title="Chat với chúng tôi ngay"
        description="Live Chat CSKH 24/7"
        suffix="arrow-right.webp"
        class="h-14 bg-custom-gradient-5 pl-4 pr-2"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
