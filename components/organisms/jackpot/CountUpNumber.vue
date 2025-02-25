<script setup lang="ts">
import { CountUp } from "countup.js";

type ICountUpOptions = {
  startVal?: number;
  decimalPlaces?: number;
  duration?: number;
  useEasing?: boolean;
  useGrouping?: boolean;
  smartEasingThreshold?: number;
  smartEasingAmount?: number;
  separator?: string;
  decimal?: string;
  prefix?: string;
  suffix?: string;
  enableScrollSpy?: boolean;
  scrollSpyDelay?: number;
  onCompleteCallback?: () => void;
  onStartCallback?: () => void;
  onPauseResumeCallback?: () => void;
  onResetCallback?: () => void;
  onUpdateCallback?: () => void;
};

// Helper function for RAF delay
const useRaf = (cb: () => void, delaySeconds: number = 1) => {
  const rafId = ref<number>(-1);
  let startTime: number | undefined;

  const count = (timestamp: number) => {
    if (!startTime) {
      startTime = timestamp;
    }
    const diff = timestamp - startTime;
    if (diff < delaySeconds * 1000) {
      rafId.value = requestAnimationFrame(count);
    } else {
      cb();
    }
  };

  rafId.value = requestAnimationFrame(count);

  const cancel = () => {
    window.cancelAnimationFrame(rafId.value);
  };

  return { cancel };
};

const props = defineProps({
  endVal: {
    type: [Number, String] as PropType<number | string>,
    required: true,
  },
  startVal: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  duration: {
    type: [Number, String] as PropType<number | string>,
    default: 2.5,
  },
  decimalPlaces: {
    type: Number,
    default: 0,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
  options: {
    type: Object as PropType<ICountUpOptions>,
    default: () => ({}),
  },
});

const emit = defineEmits(["init", "finished"]);

const elRef = ref<HTMLElement | undefined>(undefined);
const countUp = ref<CountUp | undefined>(undefined);
const finished = ref<boolean>(false);
let loopCount = 0;
let rafCtx: ReturnType<typeof useRaf> | null = null;

const initCountUp = () => {
  if (!elRef.value) {
    console.warn("[vue-countup]", "Element reference not found");
    return;
  }

  loopCount = 0;
  finished.value = false;

  const startVal = Number(props.startVal);
  const endVal = Number(props.endVal);
  const duration = Number(props.duration);

  countUp.value = new CountUp(elRef.value, endVal, {
    startVal,
    duration,
    decimalPlaces: props.decimalPlaces,
    ...props.options,
  });

  if (countUp.value.error) {
    console.error("[vue-countup]", countUp.value.error);
    return;
  }

  emit("init", countUp.value);
};

const startAnimation = () => {
  const _loop = () => {
    const isTruely = typeof props.loop === "boolean" && props.loop;
    if (isTruely || (typeof props.loop === "number" && props.loop > loopCount)) {
      rafCtx = useRaf(() => {
        countUp.value?.reset();
        startAnimation();
      }, props.delay);
    } else {
      finished.value = true;
    }
  };

  if (!countUp.value) {
    initCountUp();
  }

  countUp.value?.start(_loop);
  loopCount++;
};

const restart = () => {
  rafCtx?.cancel();
  initCountUp();
  startAnimation();
};

const update = (newEndVal: number) => {
  countUp.value?.update(newEndVal);
};

const pauseResume = () => {
  countUp.value?.pauseResume();
};

const reset = () => {
  countUp.value?.reset();
};

watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    restart();
  }
});

watch(finished, (flag) => {
  if (flag) {
    if (props.options?.onCompleteCallback) {
      props.options.onCompleteCallback();
    }
    emit("finished");
  }
});

onMounted(() => {
  initCountUp();
  if (props.autoplay) {
    startAnimation();
  }
});

onUnmounted(() => {
  rafCtx?.cancel();
  countUp.value?.reset();
});

defineExpose({
  init: initCountUp,
  restart,
  update,
  pauseResume,
  reset,
  countUp,
});
</script>

<template>
  <div class="countup-wrap">
    <slot name="prefix" />
    <span ref="elRef" />
    <slot name="suffix" />
  </div>
</template>
