<template>
  <div class="container">
     <pptx :src="fileUrl" style="width: 1086px" class="pptx-container" />
  </div>
</template>

<script setup lang="ts">
import pptx from '../package/index'
const fileUrl = 'https://cdn.xianjianai.com/test/project/2340/document/2343/b4ea74d4-f209-4ec7-a434-a2272778d1cc.pptx'
</script>

<style  lang="scss">
.container {
  width: 500px;
}

</style>
