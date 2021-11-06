<template>
  <div class="d-flex flex-column justify-space-between">
    <div class="d-flex flex-column" style="height: 635px">
      <span style="font-size: 24px" class="font-weight-medium"
        >Seok JunYoung</span
      >
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
    </div>
    <CardPostCard
      v-for="(data, index) in postCardsData"
      :key="index"
      :category="data.category"
      :title="data.title"
      :subtitle="data.subtitle"
      :style="index === postCardsData.length - 1 ? '' : 'margin-bottom: 56px'"
    />
    <div class="d-flex flex-column" style="margin-top: 56px">
      <span style="font-size: 24px" class="font-weight-medium"
        >Seok JunYoung</span
      >
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
      <span>Web Developer</span>
    </div>
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
      {
        category: '[Logging, Photo]',
        title: ['여의도', '그리고 신길'],
        subtitle: '2021년의 기록',
      },
      {
        category: '[Music, Video]',
        title: ['자작곡', '프로필(Profile)'],
        subtitle: '2020년 덥지 않은 여름밤',
      },
      {
        category: '[Logging, Photo]',
        title: ['제주도', '가족 여행'],
        subtitle: '2020년 가을',
      },
      {
        category: "[Stein's Song, Short]",
        title: ['Goodbye, Halloween', '할로윈, 그 뒤의 정리'],
        subtitle: '2021.10.31',
      },
      {
        category: '[Remake, Short]',
        title: ['아따맘마 오프닝', '잘 있어요'],
        subtitle: '안녕하세요, 감사해요, 잘 있어요',
      },
      {
        category: '[Arrange]',
        title: ['양화대교 - Zion.T', 'Arranged By Stein'],
        subtitle: '2017년의 서울',
      },
    ]
    return { postCardsData }
  },
})
</script>


<style>
</style>