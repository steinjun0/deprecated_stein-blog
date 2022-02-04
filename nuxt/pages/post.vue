<template>
  <div class="d-flex flex-row">
    <v-row style="max-width: 946px; margin-top: 36px; width: 100%">
      <v-col>
        <nuxt-child :key="$route.fullPath" :post="post"></nuxt-child>
      </v-col>
    </v-row>

    <div
      id="right-floating-category-nav"
      class="d-none d-sm-flex"
      style="margin: 165px 0 0 73px; border-left: 1px solid rgba(0, 0, 0, 0.12)"
    >
      <div
        :style="`margin-top: ${presentSideNavigationPosition}px`"
        style="transition-duration: 0.4s; transition-timing-function: ease-out"
      >
        <v-row style="padding-left: 40px">
          <v-col style="color: #686868">
            <div v-for="(menu, index) in categories" :key="index">
              <div
                v-if="menu.type === 'main'"
                class="font-weight-medium"
                style="margin-bottom: 8px"
              >
                <nuxt-link
                  :to="`/post/list?category=${menu.name}`"
                  style="color: rgba(0, 0, 0, 0.87)"
                  :style="
                    $route.fullPath.includes(menu.name)
                      ? ''
                      : 'text-decoration: none'
                  "
                >
                  {{ menu.name }}
                </nuxt-link>
              </div>
              <div
                v-else
                style="font-size: 14px; margin-left: 12px; margin-bottom: 16px"
              >
                <nuxt-link
                  :to="`/post/list?category=${menu.name}`"
                  style="color: rgba(0, 0, 0, 0.87)"
                  :style="
                    $route.fullPath.includes(menu.name)
                      ? ''
                      : 'text-decoration: none'
                  "
                >
                  {{ menu.name }}
                </nuxt-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ssrRef, useAsync } from '@nuxtjs/composition-api'
import {
  ref,
  onMounted,
  computed,
  watch,
  onBeforeUnmount,
} from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
// import util from '~/plugins/util'

const PostAPI = new ViewSetAPI('blog/post')
const CategoryAPI = new ViewSetAPI('blog/category')

export default defineComponent({
  setup(props, context) {
    // const currentInstance = getCurrentInstance()
    const id = computed(() => context.root._route.params.id)
    const path = computed(() => context.root._route.path)
    const isPostList = computed(() => path.value === '/post/list')
    const post = ssrRef({})
    const categories = ssrRef([])

    const presentSideNavigationPosition = ref(0)

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

    const enterPostProcess = async (idRef, postRef) => {
      const res = await PostAPI.getAxios(idRef.value)
      if (res.error !== undefined) {
        if (res.error.response.data.detail === 'Not found.') {
          alert('not found')
          context.root._router.push('/post/edit/new')
        }
      } else {
        postRef.value = res
      }
      return res
    }

    const refreshData = (idRef, isPostListRef, post) => {
      if (id.value === 'new') {
        // empty
      } else if (isPostListRef.value) {
        post.value = {}
        // empty
      } else if (id.value === undefined) {
        alert('wrong access')
        context.root._router.push('/')
      } else {
        useAsync(() => enterPostProcess(id, post))
      }
      return ''
    }

    const setCategories = async (categoriesRef) => {
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
          categoriesRef.value.push(mainCategories[i])
          for (let j = 0; j < subCategories.length; j += 1) {
            if (subCategories[j].parent === mainCategories[i].name) {
              categoriesRef.value.push(subCategories[j])
            }
          }
        }
      }
      const bak = categoriesRef.value
      categoriesRef.value = bak

      return categoryRes
    }

    const handleScroll = () => {
      // Your scroll handling here
      presentSideNavigationPosition.value = window.scrollY
    }

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    watch(path, () => {
      refreshData(id, isPostList, post)
    })

    refreshData(id, isPostList, post)
    useAsync(() => setCategories(categories))

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    // watch(context.root._route.path, (val) => {
    //   if
    // })
    return {
      post,
      menuList,
      categories,
      path,
      presentSideNavigationPosition,
    }
  },
})
</script>


<style>
@import '@/assets/quill/highlight.js/monokai-sublime.css';
@import '@/assets/quill/snow.css';
</style>