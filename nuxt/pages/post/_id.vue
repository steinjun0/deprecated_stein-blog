<template>
  <div class="d-flex flex-row">
    <div>
      <v-row v-if="post.title" style="max-width: 946px">
        <v-col cols="12">
          <div class="d-flex flex-column">
            <div style="font-size: 12px; margin-left: 3px">
              [<span v-for="(category, index) in post.categories" :key="index">
                {{ category.name }}
                {{ index + 1 !== post.categories.length ? ', ' : '' }} </span
              >]
            </div>
            <div class="font-weight-bold" style="font-size: 36px">
              {{ post.title }}
            </div>
            <div style="margin-top: 12px">
              {{ post.sub_title }}
            </div>
            <div class="d-flex" style="margin-top: 12px; margin-left: auto">
              <div style="font-size: 12px; color: #686868">
                mod.
                {{ Utils.shortenTime(post.modified_at) }}
              </div>
              <div style="font-size: 12px; color: #686868; margin-left: 8px">
                crt.
                {{ Utils.shortenTime(post.created_at) }}
              </div>
            </div>
          </div>
          <v-divider style="margin-top: 8px"></v-divider>
        </v-col>
        <v-col cols="12">
          <div v-html="post.html"></div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
import Utils from '@/plugins/util'
const PostAPI = new ViewSetAPI('blog/post')

export default defineComponent({
  setup(props, context) {
    // const currentInstance = getCurrentInstance()
    const id = context.root._route.params.id
    const post = ref({})
    // const router = context.root._router
    // router.push('/')
    // console.log('context', context)
    onMounted(async () => {
      const res = await PostAPI.getAxios(id)
      if (res.error !== undefined) {
        if (res.error.response.data.detail === 'Not found.') {
          alert('not found')
        }
      } else {
        post.value = res
      }
    })
    return { post, Utils }
  },
})
</script>


<style>
</style>