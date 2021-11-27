<template>
  <div class="d-flex flex-row">
    <div>
      <v-row v-if="post.title" style="max-width: 946px">
        <v-col cols="12" style="margin-top: 72px">
          <div class="d-flex flex-column">
            <div style="font-size: 12px">
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
                {{
                  post.modified_at.slice(0, 10) +
                  ' ' +
                  post.modified_at.slice(11, 16)
                }}
              </div>
              <div style="font-size: 12px; color: #686868; margin-left: 8px">
                crt.
                {{
                  post.created_at.slice(0, 10) +
                  ' ' +
                  post.created_at.slice(11, 16)
                }}
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
    <div
      style="margin: 218px 0 0 73px; border-left: 1px solid rgba(0, 0, 0, 0.12)"
    >
      <v-row style="padding-left: 40px">
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
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
const PostAPI = new ViewSetAPI('blog/post')

export default defineComponent({
  setup(props, context) {
    // const currentInstance = getCurrentInstance()
    const id = context.root._route.params.id
    const post = ref({})
    // const router = context.root._router
    console.log('id', id)
    // router.push('/')
    // console.log('context', context)
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
    return { post, menuList }
  },
})
</script>


<style>
</style>