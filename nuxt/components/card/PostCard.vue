<template>
  <div
    class="d-flex flex-column"
    style="
      border-bottom: solid #c4c4c4 1px;
      height: 155px;
      color: #373737;
      cursor: pointer;
    "
  >
    <span style="font-size: 14px; height: 21px"
      >[
      <span v-for="(category, index) in categories" :key="index">
        {{ category }}{{ index + 1 !== categories.length ? ', ' : '' }}
      </span>
      ]</span
    >
    <span
      style="
        font-size: 24px;
        margin-bottom: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      "
      class="font-weight-medium"
      >{{ firstLineTitle }} <br />{{ secondLineTitle }}</span
    >
    <span
      style="
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      "
      >{{ subtitle }}</span
    >
  </div>
</template>
      
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    categories: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let firstLineTitle
    let secondLineTitle
    if (props.title.includes('\\')) {
      firstLineTitle = props.title.slice(0, props.title.indexOf('\\'))
      secondLineTitle = props.title.slice(props.title.indexOf('\\') + 1)
    } else {
      firstLineTitle = props.title
      secondLineTitle = ''
    }

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
