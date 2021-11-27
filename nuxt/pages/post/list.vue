<template>
  <v-row>
    <div>
      <div style="position: relative" class="hover-effect">
        <span style="z-index: 100">hihi</span>
        hello
      </div>
    </div>
    <v-col
      v-for="(post, index) in postList"
      :key="index"
      class="d-flex flex-column"
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
    >
      <div style="font-size: 12px; margin-left: 3px">
        [<span v-for="(category, pIndex) in post.categories" :key="pIndex">
          {{ category.name }}
          {{ pIndex + 1 !== post.categories.length ? ', ' : '' }} </span
        >]
      </div>
      <div style="font-size: 24px; font-weight: 500">
        {{ post.title }}
      </div>
      <div
        class="d-flex justify-content-between align-end"
        style="margin-top: 8px"
      >
        <span>
          {{ post.sub_title }}
        </span>
        <span
          style="margin-left: auto; color: rgb(104, 104, 104); font-size: 12px"
        >
          {{ Utils.shortenTime(post.created_at) }}
        </span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
import Utils from '@/plugins/util'
const PostAPI = new ViewSetAPI('blog/post')

export default defineComponent({
  setup() {
    const postList = ref([])
    onMounted(async () => {
      postList.value = await PostAPI.getAxios()
      console.log(postList.value)
    })
    return { postList, Utils }
  },
})
</script>

<style>
.hover-effect::before {
  transform: scaleX(0);
  transform-origin: bottom right;
}

.hover-effect:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.hover-effect::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  inset: 0 0 0 0;
  background: hsl(200 100% 80%);
  z-index: -1;
  transition: transform 0.3s ease;
}
.hover-effect {
  z-index: 1;
  position: absolute;
}
</style>