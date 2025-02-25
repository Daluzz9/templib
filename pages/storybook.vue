<script lang="ts" setup>
import { scheduleData } from "~/components/organisms/schedule-match/mock-data";

const dropdownValue = ref("");
const inputMaskVal = ref("");
const inputTextVal = ref("");
</script>

<template>
  <ClientOnly>
    <div class="my-3 grid grid-cols-2 gap-4">
      <InputMaskNumber v-model="inputMaskVal" placeholder="Vui lòng nhập mask number" name="mask-number">
        <template #prefix>Số tiền</template>
        <template #suffix>= 100,000 VND</template>
      </InputMaskNumber>
      <InputText v-model.number="inputTextVal" type="number" placeholder="Vui lòng nhập number" name="value">
        <template #prefix>Số</template>
        <template #suffix>= 100,000 VND</template>
      </InputText>
    </div>
  </ClientOnly>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <DropdownMenuToggle>Sắp xếp</DropdownMenuToggle>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup v-model="dropdownValue">
        <DropdownMenuRadioItem value="1">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="2">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="3">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="4">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="5">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="6">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="7">Top</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>

  <div class="my-2 md:flex md:gap-2">
    <div>
      <div>CardImageCategory</div>
      <CardImageCategory
        class="w-[410px]"
        url="/text"
        thumbnail="https://v2.flashcore.net/AC116768/events/pc/b92c21802a8bb49f1176cde2d41a698e.webp"
        title="Nhận 1,5% tiền cược thể thao mỗi ngày, rút liền tay giờ vàng Euro, 20:00 - 23:45 mỗi ngày rút liền tay giờ vàng Euro, 20:00 - 23:45 mỗi ngày"
      />
    </div>
    <div>
      <div>CardNewsVertical</div>
      <CardNewsVertical
        class="w-[410px]"
        url="/text"
        thumbnail="https://v2.flashcore.net/AC116768/news/pc/vi/0a15ee184aa0a99634e9ee9b84864122.jpg"
        title="Nhận 1,5% tiền cược thể thao mỗi ngày, rút liền tay giờ vàng Euro, 20:00 - 23:45 mỗi ngày rút liền tay giờ vàng Euro, 20:00 - 23:45 mỗi ngày"
        description="Schalke thua kèo châu Á 4/6 trận sân khách vừa qua tại giải hạng hai Đức khi là đội cửa dưới. Trong 6 trận nói trên, Schalke phải chịu tới 18 bàn thua, trung bình lên tới 3 bàn thua/trận. Ngoài ra, đội bóng vùng Ruhr cũng đã thua kèo châu Á cả 4 lần gần nhất đối đầu Karlsruher, đều diễn ra tại Bundesliga 2."
        date-published="2024-12-07T09:00:00.000Z"
      />
    </div>
    <div>
      <div>CardNewsHorizontal</div>
      <CardNewsHorizontal
        url="/text"
        thumbnail="https://v2.flashcore.net/AC116768/news/pc/vi/ef616de8db17430b2da3bdc13b0dc0c4.jpg"
        title="Nhận 1,5% tiền cược thể thao mỗi ngày, rút liền tay giờ vàng Euro, 20:00 - 23:45 mỗi ngày rút liền tay giờ vàng Euro, 20:00 - 23:45 mỗi ngày"
        description="Schalke thua kèo châu Á 4/6 trận sân khách vừa qua tại giải hạng hai Đức khi là đội cửa dưới. Trong 6 trận nói trên, Schalke phải chịu tới 18 bàn thua, trung bình lên tới 3 bàn thua/trận. Ngoài ra, đội bóng vùng Ruhr cũng đã thua kèo châu Á cả 4 lần gần nhất đối đầu Karlsruher, đều diễn ra tại Bundesliga 2."
        date-published="2024-12-07T09:00:00.000Z"
      />
    </div>
  </div>
  <div class="container my-2">
    <ScheduleMatchTableDesktop
      :league-logo="scheduleData[0].league_image"
      :league-name="scheduleData[0].league_name"
      :match-list="scheduleData"
    />
  </div>
  <div class="container my-2">
    <ScheduleMatchTableMobile
      :league-logo="scheduleData[0].league_image"
      :league-name="scheduleData[0].league_name"
      :match-list="scheduleData"
    />
  </div>
</template>
