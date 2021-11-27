<template>
  <div class="d-flex flex-row">
    <v-row style="max-width: 946px; margin-top: 36px">
      <v-col>
        <NuxtChild></NuxtChild>
      </v-col>
    </v-row>

    <div
      style="margin: 194px 0 0 73px; border-left: 1px solid rgba(0, 0, 0, 0.12)"
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