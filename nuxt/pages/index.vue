<template>
  <v-row justify="center" align="center">
    <v-col>
      <!-- <v-btn @click="switchShow">{{ show }}</v-btn>
      <TransientCard :show="show">
        <span>안녕하세요</span>
      </TransientCard> -->
    </v-col>
    <v-col cols="12">
      <span style="font-size: 144px">stein.log</span>
    </v-col>
    <v-col md="4" style="border-right: solid #c4c4c4 1px">
      <CardPostCard
        v-for="(data, index) in postCardsData"
        :key="index"
        :category="data.category"
        :title="data.title"
        :subtitle="data.subtitle"
        :style="index === postCardsData.length - 1 ? '' : 'margin-bottom: 56px'"
      />
    </v-col>
    <v-col md="4"> menu </v-col>
    <v-col md="4"> visual content </v-col>
  </v-row>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
export default defineComponent({
  setup() {
    const show = ref(false)
    const delayFunction = (func, input = 100) => {
      return () => {
        setTimeout(func, input)
      }
    }
    const switchShow = (input = undefined) => {
      if (typeof input !== 'boolean') {
        show.value = !show.value
      } else {
        show.value = input
      }
    }
    onMounted(() => {
      delayFunction(switchShow, 1000)
    })

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
    return { show, switchShow, postCardsData }
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
