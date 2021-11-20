<template>
  <div>
    <client-only>
      <editor ref="editor" :initial-value="text" align="left"> </editor>
      <viewer v-if="toggle" :initial-value="text"></viewer>
    </client-only>
  </div>
</template> <script>
export default {
  data() {
    return {
      text: '# 이곳에 글을 써주세요! 오른쪽은 미리보기 입니다.',
      toggle: false,
    }
  },
}
</script>

<style>
</style>