<script setup lang="ts">
const brandName = useRuntimeConfig().public.BRAND_NAME;

const { gameRateTableData, userRank, isLoading, levelItems } = usePromotionVip();
</script>
<template>
  <figure>
    <p class="mb-4 text-xl text-text-primary"><strong>Giới thiệu VIP</strong></p>
    <ul class="list-inside list-disc text-base font-normal text-text-secondary">
      <li class="mb-4">
        Câu lạc bộ VIP tại {{ brandName }} tạo ra sân chơi đỉnh cao cho những dân chơi thứ thiệt, các thành viên thân
        thiết nhận được nhiều ưu đãi độc quyền hơn khi đặt cược tại {{ brandName }}.
      </li>
      <li>
        Không dừng lại ở những ưu đãi hay dịch vụ VIP, {{ brandName }} còn cam kết mang tới nhiều chương trình VIP hơn
        nữa dành riêng cho quý thành viên VIP, nhằm giúp thành viên tối ưu hóa lợi nhuận và tiền thưởng đạt được.
      </li>
    </ul>
  </figure>

  <RankVip class="my-4" :level-items="levelItems" />

  <figure>
    <p class="mb-4 text-xl text-text-primary"><strong>Đặc quyền VIP</strong></p>
    <ol class="list-inside list-decimal text-base font-normal text-text-secondary">
      <li class="mb-4">Không giới hạn NẠP / RÚT tiền, hỗ trợ duyệt phiếu trong giây lát.</li>
      <li class="mb-4">
        Tham gia toàn bộ ưu đãi, khuyến mãi của {{ brandName }} mà không bị giới hạn tiền thưởng nhận được.
      </li>
      <li class="mb-4">Hỗ trợ 24/7, trả lời bất kì yêu cầu nào của quý khách trong ít phút.</li>
      <li class="mb-4">THƯỞNG HOÀN TRẢ mỗi ngày, RÚT TIỀN NGAY không yêu cầu doanh thu vòng cược.</li>
    </ol>
  </figure>

  <LoadingSpinner v-if="isLoading" class="my-4" />
  <RefundRangeTable v-else :table-data="gameRateTableData" :active-level="userRank ?? -1" class="my-4" />

  <p class="text-base font-normal text-text-secondary">
    5.&nbsp;Và nhiều chế độ, chính sách ưu đãi khác dành riêng cho thành viên {{ brandName }}!
  </p>
  <slot v-if="!isLoading" name="action" />
</template>
