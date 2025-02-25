<script setup lang="ts">
import type { IBreadcrumb } from "~/components/atomics/custom/breadcumb/type";

const { categories, error, status } = useNewsTab();
const { postDetail, currentPostAlias } = useStaticAndNewsDetail();

const breadcrumbs = computed<IBreadcrumb[]>(() => {
  if (!categories.value?.length) {
    return [];
  }
  return categories.value.reduce<IBreadcrumb[]>(
    (acc, { display_name, alias }) => {
      if (currentPostAlias.value === alias) {
        acc.push({ label: display_name, url: `${APP_PATH.NEWS}/${alias}` });
      }
      return acc;
    },
    [{ url: APP_PATH.NEWS, label: "Tin tức" }],
  );
});
</script>

<template>
  <NewsDetailLayoutDesktop>
    <template #header>
      <ArticleHeader
        :title="postDetail?.title"
        :description="postDetail?.description"
        :date-published="postDetail?.created_at"
        :breadcrumbs="breadcrumbs"
      />
    </template>

    <template #content>
      <HTMLRenderer
        :html-content="postDetail?.content?.replace(/<\/?h1>/g, (match) => (match[1] === '/' ? '</h2>' : '<h2>'))"
      />
    </template>

    <template v-if="postDetail?.related_news.length" #related-news>
      <NewsDivider />
      <!-- Sion: handle 2 case nay nha -->
      <template v-if="status === 'pending'"></template>
      <template v-if="error"></template>
      <h4 class="pb-2 text-base font-bold capitalize text-primary">Tin tức liên quan</h4>
      <div class="grid grid-cols-3 gap-8">
        <CardNewsVertical
          v-for="post in postDetail?.related_news.slice(0, 6)"
          :key="post.alias"
          :url="`${APP_PATH.NEWS}/${post.alias}`"
          :thumbnail="post.img"
          :title="post.title"
          :date-published="postDetail.created_at"
          title-class="md:text-base md:font-semibold mt-3"
        />
      </div>
      <NewsDivider class="mb-0" />
    </template>
  </NewsDetailLayoutDesktop>
</template>
