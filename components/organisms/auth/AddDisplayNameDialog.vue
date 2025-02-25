<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { SubmissionContext } from "vee-validate";

type IUpdateInfoForm = IUpdateInfoBody;

type IProps = {
  controller: IUseDialog;
};

const props = defineProps<IProps>();

const emits = defineEmits(["succeed"]);

const { addDisplayName, isAddDisplayNameProcessing, addDisplayNameValidationSchema } = useAddDisplayName();

const onSubmit = async (addDisplayNameFormValue: IUpdateInfoForm, ctx: SubmissionContext<IUpdateInfoForm>) => {
  const hasSucceeded = await addDisplayName(addDisplayNameFormValue);

  if (hasSucceeded) {
    emits("succeed");
    props.controller.closeDialog();
  }
};

onMounted(() => {
  autoFocusForm("#addDisplayNameForm");
});
</script>

<template>
  <Form v-slot="{ handleSubmit, values }" as="" :validation-schema="addDisplayNameValidationSchema">
    <Dialog :controller="controller" :type="DialogTypeEnum.ADD_DISPLAY_NAME">
      <DialogTrigger as-child>
        <slot name="trigger" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm Tên Hiển Thị</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <form id="addDisplayNameForm" @submit.prevent="handleSubmit($event, onSubmit as any)">
            <div class="flex flex-col gap-3">
              <FormField v-slot="{ componentField }" name="fullname">
                <FormItem>
                  <FormLabel class="text-neutral-50">Cập nhật tên hiển thị</FormLabel>
                  <FormControl>
                    <InputText :name="componentField.name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <div class="flex gap-2">
                <SvgoCircleExclamation class="flex-shrink-0 text-xl text-warning-400" />
                <p class="text-xs text-neutral-300">
                  Quý khách vui lòng thêm tên hiển thị để vào game. Tên hiển thị không được trùng với Tên đăng nhập.
                </p>
              </div>
            </div>
          </form>

          <Button
            type="submit"
            form="addDisplayNameForm"
            class="h-12 w-full"
            :disabled="isAddDisplayNameProcessing || !values.fullname"
          >
            Xác Nhận
          </Button>
        </DialogBody>
      </DialogContent>
    </Dialog>
  </Form>
</template>
