import type { Plugin } from "vue";
import VuePptx from "./pptx/index.vue";

export const VuePptxPlugin: Plugin = {
  install(Vue) {
    Vue.component(VuePptx.name!, VuePptx);
  },
};
export default VuePptx
