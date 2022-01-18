<template>
  <div class="d-flex flex-row">
    <v-row style="max-width: 946px; margin-top: 36px">
      <v-col>
        <NuxtChild :key="$route.fullPath" :post="post"></NuxtChild>
      </v-col>
    </v-row>

    <div
      style="margin: 165px 0 0 73px; border-left: 1px solid rgba(0, 0, 0, 0.12)"
    >
      <v-row style="padding-left: 40px">
        <v-col style="color: #686868">
          <div v-for="(menu, index) in categories" :key="index">
            <div
              v-if="menu.type === 'main'"
              class="font-weight-medium"
              style="margin-bottom: 8px"
            >
              {{ menu.name }}
            </div>
            <div
              v-else
              style="font-size: 14px; margin-left: 12px; margin-bottom: 16px"
            >
              {{ menu.name }}
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
const CategoryAPI = new ViewSetAPI('blog/category')

export default defineComponent({
  setup(props, context) {
    // const currentInstance = getCurrentInstance()
    const id = context.root._route.params.id
    const path = context.root._route.path
    const isPostList = path === '/post/list'
    const post = ref({})
    const categories = ref([])
    // const router = context.root._router
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
      if (id === 'new') {
        // empty
      } else if (isPostList) {
        // empty
      } else if (id === undefined) {
        alert(path)
        alert('wrong access')
        context.root._router.push('/')
      } else {
        const res = await PostAPI.getAxios(id)
        if (res.error !== undefined) {
          if (res.error.response.data.detail === 'Not found.') {
            alert('not found')
            context.root._router.push('/post/edit/new')
          }
        } else {
          post.value = res
        }
      }

      const categoryRes = await CategoryAPI.getAxios()
      if (categoryRes.error !== undefined) {
        alert('Network Error')
      } else {
        const mainCategories = []
        const subCategories = []
        for (let i = 0; i < categoryRes.length; i += 1) {
          if (categoryRes[i].type === 'main') {
            mainCategories.push(categoryRes[i])
          } else {
            subCategories.push(categoryRes[i])
          }
        }

        for (let i = 0; i < mainCategories.length; i += 1) {
          categories.value.push(mainCategories[i])
          for (let j = 0; j < subCategories.length; j += 1) {
            if (subCategories[j].parent === mainCategories[i].name) {
              categories.value.push(subCategories[j])
            }
          }
        }
      }
    })
    return { post, menuList, categories }
  },
})
</script>


<style>
</style>