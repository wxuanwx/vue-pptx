<template>
  <div
    class="vue-office-pptx-main"
    ref="rootRef"
    style="width: 100%; height: 100%"
  ></div>
</template>

<script lang="ts">
export default {
  name: "VuePptx",
};
</script>
<script lang="ts" setup>
import { init as initPptxPreviewer } from "pptx-preview";
import { defineProps, onMounted, ref, watch } from "vue";
const props = withDefaults(
  defineProps<{
    src: string | Blob;
    requestOptions?: any;
    options?: any;
  }>(),
  {
    requestOptions: () => ({}),
    options: () => ({}),
  }
);
const emits = defineEmits<{
  (event: "rendered", params: any): void;
  (event: "error", params: any): void;
}>();

let pptxViewer: any = null;
const rootRef = ref<any>(null);

const init = () => {
  let container = rootRef.value;
  let width =
    props.options.width || container.getBoundingClientRect().width || 960;
  let height =
    props.options.height || container.getBoundingClientRect().height || 540;
  pptxViewer = initPptxPreviewer(container, {
    width,
    height,
  });
};
const getPptxBlob = async (src: string | Blob) => {
  if (typeof src === "string") {
    const res = await fetch(src, props.requestOptions);
    return res.arrayBuffer();
  }
  return src;
};
const preview = async () => {
  if (props.src) {
    try {
      const buffer = await getPptxBlob(props.src);
      const data = pptxViewer.preview(buffer);
      emits("rendered", data);
    } catch (error) {
      emits("error", error);
    }
  }
};
onMounted(() => {
  init();
  preview();
});
watch(
  () => props.src,
  () => {
    preview();
  }
);
defineExpose({ preview });
</script>

<style lang="less"></style>
