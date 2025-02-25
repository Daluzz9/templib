<script setup lang="ts">
const {
  postHighlight,
  newsPosts,
  status,
  createNewsDetailPath,
  totalItem,
  pageLimit,
  currentPage,
  onCategoryPageChanged,
} = useNews();
</script>

<template>
  <NewsContentLayoutDesktop :is-loading="status === 'pending'" :is-empty="!newsPosts?.length">
    <template #content>
      <NewsHomeLayoutDesktop>
        <template #highlight-left>
          <CardNewsVertical
            :url="createNewsDetailPath(postHighlight?.alias)"
            :thumbnail="postHighlight?.img ?? ''"
            :title="postHighlight?.title ?? ''"
            :description="postHighlight?.description ?? ''"
            :date-published="postHighlight?.created_at ?? ''"
          />
        </template>

        <template #highlight-right>
          <CardNewsHorizontal
            v-for="(post, index) in newsPosts?.slice(1, 4)"
            :key="post.id"
            :url="createNewsDetailPath(post?.alias)"
            :thumbnail="post.img"
            :title="post.title"
            :description="post.description"
            :date-published="post.created_at"
            :show-bottom-divider="index !== 2"
          />
        </template>

        <template #list>
          <CardNewsHorizontal
            v-for="(post, index) in newsPosts.slice(4, newsPosts.length)"
            :key="post.id"
            :url="createNewsDetailPath(post?.alias)"
            :thumbnail="post.img"
            :title="post.title"
            :description="post.description"
            :date-published="post.created_at"
            :show-top-divider="true"
            :top-divider-class="index === 0 && 'mt-0'"
            class="min-h-[37px]"
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
      </NewsHomeLayoutDesktop>
    </template>
  </NewsContentLayoutDesktop>
</template>
