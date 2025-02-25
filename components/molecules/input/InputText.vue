<script lang="ts" setup>
import LockEyeIcon from "~/assets/icons/lock-eye.svg";
import EyeIcon from "~/assets/icons/eye.svg";
import { useSubmitCount } from "vee-validate";

const submittedCount = useSubmitCount();

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  class: {
    type: String,
    default: "",
  },
  classInput: {
    type: String,
    default: "",
  },
  minLength: {
    type: Number,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  validateOnChange: {
    type: Boolean,
    default: false,
  },
  hasClearBtn: {
    type: Boolean,
    default: false,
  },
  trim: {
    type: Boolean,
    default: false,
  },
  notAllowMultipleSpaces: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", input: string): void;
}>();

const { setValue, value: inputValue } = useField(props.name, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false,
});

const elWrapperInput = ref<HTMLInputElement | null>(null);
const isVisible = ref<boolean>(false);

const onInputChange = (e: Event) => {
  const inputEvent = e.target as HTMLInputElement;
  let value = inputEvent.value;

  if (props.trim && typeof value === "string") {
    value = value.replace(/\s+/g, "");
  }

  if (props.notAllowMultipleSpaces && typeof value === "string") {
    value = value.replace(/\s{2,}/g, " ");
  }

  if (props.type === "number") {
    value = value.replace(/[^0-9]/g, "");
  }

  setValue(value, props.validateOnChange || submittedCount.value > 0);
  emits("update:modelValue", value);
};

const inputType = computed(() => {
  if (props.type === "number") return "text";
  return isVisible.value && props.type === "password" ? "text" : props.type;
});

const isPasswordType = computed(() => props.type === "password" || inputType.value === "password");

const icon = computed(() => {
  return isVisible.value ? LockEyeIcon : EyeIcon;
});

defineExpose({
  focus: () => {
    const elInput = elWrapperInput.value?.querySelector("input") as HTMLElement;
    elInput?.focus();
  },
});
</script>
<template>
  <div
    ref="elWrapperInput"
    :class="
      cn(
        'relative flex h-12 w-full items-center rounded-lg border border-input-border bg-input-bg focus-within:border-input-focus-border',
        'has-[input:disabled]:border-input-disabled-border has-[input:disabled]:bg-input-disabled-bg',
        props.class,
      )
    "
  >
    <div v-if="$slots.prefix" :class="cn('prefix', 'flex flex-shrink-0 items-center px-3')">
      <slot name="prefix" />
    </div>
    <input
      v-model="inputValue"
      v-bind="$attrs"
      :type="inputType"
      :placeholder="placeholder"
      :class="
        cn(
          'flex h-full w-full border-0 bg-[transparent] px-3 py-2 text-sm font-normal text-text-primary shadow-none outline-0 focus:placeholder-[transparent] disabled:cursor-auto',
          'file:border-0 file:bg-[transparent] file:text-sm file:font-medium placeholder:text-text-placeholder',
          'focus:caret-primary-300',
          props.classInput,
        )
      "
      :minlength="minLength"
      :maxlength="maxLength"
      :disabled="disabled"
      @input="onInputChange"
    />
    <div
      v-if="$slots.suffix || isPasswordType || hasClearBtn"
      :class="cn('suffix', 'flex flex-shrink-0 items-center px-3')"
    >
      <slot name="suffix">
        <button v-if="hasClearBtn" type="button" tabindex="-1" @click.prevent.stop="inputValue = ''">
          <SvgoThinClose class="text-xl" />
        </button>

        <component
          :is="icon"
          v-else-if="isPasswordType"
          role="button"
          class="select-none text-xl text-text-placeholder"
          @click.stop="isVisible = !isVisible"
        />
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
input {
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
