<template>
  <div>
    <CardPostCard
      v-for="(data, index) in postCardsData"
      :key="index"
      :category="data.category"
      :title="data.title"
      :subtitle="data.subtitle"
      :style="index === postCardsData.length - 1 ? '' : 'margin-bottom: 56px'"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    let postCardsData = ref([])
    postCardsData = [
      {
        category: '[Django,Docker]',
        title: ['gunicorn에', 'vscode debugger 붙이기'],
        subtitle: '개발자여, 조금 더 편하게 살아보자',
      },
      {
        category: '[Vue 2]',
        title: ['v-model과 v-bind.sync', '그리고 Vue3'],
        subtitle: '다가오는 Vue3와 변화되는 문법',
      },
      {
        category: '[Docker]',
        title: ['docker compose와', 'Monolothic Server 구축'],
        subtitle: '환경 구축으로부터의 탈출',
      },
    ]
    return { postCardsData }
  },
})
</script>


<style>
</style>