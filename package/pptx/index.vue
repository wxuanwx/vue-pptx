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
    options?: {
      width?: number;
      height?: number;
    };
  }>(),
  {
    requestOptions: () => ({}),
  }
);
const emits = defineEmits<{
  (event: "rendered", params: any): void;
  (event: "error", params: any): void;
}>();

let pptxViewer: any = null;
const rootRef = ref<any>(null);

const init = () => {
  const width =
    props.options?.width ||
    rootRef.value?.getBoundingClientRect?.()?.width ||
    960;
  const height =
    props.options?.height ||
    rootRef.value?.getBoundingClientRect?.()?.height ||
    540;
  pptxViewer = initPptxPreviewer(rootRef.value, {
    width,
    height,
  });
  console.log('pptxViewer', pptxViewer)
};
const getPptxBlob = async (src: string | Blob) => {
  if (typeof src === "string") {
    const res = await fetch(src, props.requestOptions);
    return res.arrayBuffer();
  }
  return src;
};
const preview = async () => {
  console.log('preview', props.src)
  if (props.src) {
    try {
      const buffer = await getPptxBlob(props.src);
      console.log('buffer', buffer)
      const data = pptxViewer.preview(buffer);
      console.log('data', data)
      emits("rendered", data);
    } catch (error) {
      console.error('preview error')
      emits("error", error);
    }
  }
};
onMounted(() => {
  console.log('onMounted')
  init();
  preview();
});
watch(
  () => props.src,
  () => {
    preview()
  }
);
defineExpose({ preview });
</script>

<style lang="less"></style>
