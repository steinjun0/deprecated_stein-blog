<template>
  <div class="d-flex flex-row">
    <div>
      <v-row style="max-width: 923px">
        <v-col cols="12" style="margin-top: 72px">
          <div class="d-flex flex-column">
            <div style="font-size: 12px">[Django, Docker]</div>
            <div class="font-weight-bold" style="font-size: 32px">
              Gunicorn에 VScode debugger 붙이기
            </div>
            <div style="margin-top: 12px">
              개발자여, 조금 더 편하게 살아보자
            </div>
            <div
              class="d-flex"
              style="
                font-size: 12px;
                margin-top: 12px;
                margin-left: auto;
                color: #686868;
              "
            >
              2021/10/23 13:12
            </div>
          </div>
          <v-divider style="margin-top: 8px"></v-divider>
        </v-col>
        <v-col cols="12">
          <div>
            <p>What I want.</p>
            <p>
              django 작업을 하다보면 당연히 에러가 생기고, 어떤 변수에 어떤 값이
              들어있는지 확인하는 경우가 많다. 현재 필자는 django가 docker
              container 내부에 있기 때문에 다음과 같은 일련의 과정을 거친다. 1.
              해당 컨테이너의 로그를 띄워놓음(또는 docker-compose log) 2. 에러가
              발생하는 지점 근처에 "감으로" 변수를 출력하는 print문을 출력 3.
              코드를 저장 -> 코드를 실행 -> 코드를 저장(저장을 해야 로그가 다시
              뜬다) 4. 변수 확인후 "아 이게 아니구나" 후 다른 변수 출력하는
              print 추가 5. 2~5무한반복 꽤나 귀찮고 은근히 시간이 많이 드는
              일이다. 이런 와중에 vscode의 django debugger의 존재를 알게 되었고,
              container에 붙여보았다. 나름 까다로운 부분들이 있던 작업이었다. 한
              번 살펴보자. ※현재 필자는 (django, gunicorn)->nginx->외부 연결로
              docker container들이 구성되어있다.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div
      style="margin: 210px 0 0 75px; border-left: 1px solid rgba(0, 0, 0, 0.12)"
    >
      <v-row style="padding-left: 20px">
        <v-col style="color: #686868">
          <div v-for="(menu, index) in menuList" :key="index">
            <div
              v-if="menu.type === 'main'"
              class="font-weight-medium"
              style="margin-bottom: 8px"
            >
              {{ menu.text }}
            </div>
            <div
              v-else
              style="font-size: 14px; margin-left: 12px; margin-bottom: 16px"
            >
              {{ menu.text }}
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const menuList = ref([
      { text: 'Total', type: 'main' },
      { text: 'Programming', type: 'main' },
      { text: 'Front', type: 'sub' },
      { text: 'Back', type: 'sub' },
      { text: 'DevOps', type: 'sub' },
      { text: 'Music', type: 'main' },
      { text: 'Cover', type: 'sub' },
      { text: 'Compose', type: 'sub' },
      { text: 'Camera', type: 'main' },
      { text: 'Photo', type: 'sub' },
      { text: 'Video', type: 'sub' },
      { text: 'Life', type: 'main' },
      { text: 'Photo', type: 'sub' },
      { text: 'Video', type: 'sub' },
    ])
    return { menuList }
  },
})
</script>


<style>
</style>