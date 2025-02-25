<script setup lang="ts">
const { postDetail } = useStaticAndNewsDetail();
</script>

<template>
  <PageLayoutMobile class="bg-[transparent]">
    <template #header>
      <PageHeaderMobile title="Chi tiết" show-user-auth @back="useRouter().back()" />
    </template>

    <template #main>
      <NewsDetailLayoutDesktop>
        <template #header>
          <ArticleHeader
            :title="postDetail?.title"
            :description="postDetail?.description"
            :date-published="postDetail?.created_at"
            title-class="text-base font-semibold"
          />
        </template>

        <template #content>
          <HTMLRenderer
            :html-content="postDetail?.content?.replace(/<\/?h1>/g, (match) => (match[1] === '/' ? '</h2>' : '<h2>'))"
          />
        </template>

        <template v-if="postDetail?.related_news.length" #related-news>
          <NewsDivider />
          <h4 class="pb-3 text-base font-semibold text-[#F2F2F2]">Tin tức liên quan</h4>
          <div class="flex flex-col gap-3">
            <CardNewsHorizontal
              v-for="post in postDetail?.related_news.slice(0, 6)"
              :key="post.alias"
              :url="`${APP_PATH.NEWS}/${post.alias}`"
              :thumbnail="post.img"
              :title="post.title"
              :description="post.description"
            />
          </div>
        </template>
      </NewsDetailLayoutDesktop>
    </template>
  </PageLayoutMobile>
</template>
