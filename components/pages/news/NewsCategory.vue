<script setup lang="ts">
const { newsPosts, status, createNewsDetailPath, pageLimit, totalItem, currentPage, onCategoryPageChanged } = useNews();
</script>
<template>
  <NewsContentLayoutDesktop :is-loading="status === 'pending'" :is-empty="!newsPosts?.length">
    <template #content>
      <CardNewsHorizontal
        v-for="(newsPost, index) in newsPosts"
        :key="newsPost.id"
        :url="createNewsDetailPath(newsPost?.alias)"
        :thumbnail="newsPost.img"
        :title="newsPost.title"
        :description="newsPost.description"
        :date-published="newsPost.created_at"
        :show-top-divider="useDevice().isMobileOrTablet ? index !== 0 : true"
        :top-divider-class="index === 0 && 'mt-0'"
      />
      <Pagination
        v-if="totalItem > pageLimit"
        class="mt-4 flex justify-center"
        :total="totalItem"
        :items-per-page="pageLimit"
        :default-page="currentPage"
        @update:page="onCategoryPageChanged"
      />
    </template>
  </NewsContentLayoutDesktop>
</template>
