<template>
  <div
    class="d-flex flex-column"
    style="
      border-bottom: solid #c4c4c4 1px;
      width: 282px;
      height: 155px;
      color: #373737;
    "
  >
    <span style="font-size: 14px">{{ category }}</span>
    <span
      style="font-size: 24px; margin-bottom: 14px"
      class="font-weight-medium"
      >{{ firstLineTitle }} <br />{{ secondLineTitle }}</span
    >
    <span style="font-size: 16px">{{ subtitle }}</span>
  </div>
</template>
      
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: Array,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const firstLineTitle = props.title[0]
    const secondLineTitle = props.title[1]
    return { firstLineTitle, secondLineTitle }
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
