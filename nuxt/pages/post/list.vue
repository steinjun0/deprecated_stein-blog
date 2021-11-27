<template>
  <v-row>
    <v-col
      v-for="(post, index) in postList"
      :key="index"
      class="d-flex flex-column"
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
      <div class="d-flex justify-content-between">
        <span>
          {{ post.sub_title }}
        </span>
        <span style="margin-left: auto">
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
</style>