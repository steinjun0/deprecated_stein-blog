<template>
  <div class="d-flex flex-row">
    <v-row v-if="post.title" style="max-width: 946px; width: 100%">
      <v-col cols="12">
        <div class="d-flex flex-column">
          <div style="font-size: 12px; margin-left: 3px">
            [<span v-for="(category, index) in post.categories" :key="index">
              {{ category.name }}
              {{ index + 1 !== post.categories.length ? ', ' : '' }} </span
            >]
          </div>
          <div class="font-weight-bold" style="font-size: 36px">
            {{ post.title.replace('\\', ' ') }}
          </div>
          <div class="d-flex" style="margin-top: 12px">
            <div>
              {{ post.sub_title }}
            </div>
            <div class="d-flex" style="margin-left: auto; margin-top: auto">
              <div
                v-if="
                  Utils.shortenTime(post.modified_at) !==
                  Utils.shortenTime(post.created_at)
                "
                class="d-none d-md-flex"
                style="font-size: 12px; color: #686868"
              >
                {{ Utils.shortenTime(post.modified_at) }}
              </div>
              <div style="font-size: 12px; color: #686868; margin-left: 8px">
                {{ Utils.shortenTime(post.created_at) }}
              </div>
            </div>
          </div>
        </div>
        <v-divider style="margin-top: 8px"></v-divider>
      </v-col>
      <v-col
        cols="12"
        class="ql-container ql-snow"
        style="border: none; padding: 0; overflow-y: none"
      >
        <div class="ql-editor" v-html="post.html"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api'
// import { ViewSetAPI } from '@/API'
import Utils from '@/plugins/util'
// const PostAPI = new ViewSetAPI('blog/post')

export default defineComponent({
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, context) {
    const addCategoryQuery = () => {
      if (
        props.post.categories !== undefined &&
        props.post.categories.length !== 0
      ) {
        let categoryQuery = '?'
        props.post.categories.forEach((category) => {
          categoryQuery += `category=${category.name}&`
        })
        context.root._router
          .replace(`${categoryQuery.slice(0, -1)}`)
          .catch(() => {})
      }
    }
    watch(props, addCategoryQuery)

    // const currentInstance = getCurrentInstance()
    // const id = context.root._route.params.id
    // const post = ref({})
    // // const router = context.root._router
    // // router.push('/')
    // // console.log('context', context)
    // onMounted(async () => {
    //   console.log('why you are here?')
    //   const res = await PostAPI.getAxios(id)
    //   if (res.error !== undefined) {
    //     if (res.error.response.data.detail === 'Not found.') {
    //       alert('not found')
    //     }
    //   } else {
    //     post.value = res
    //   }
    // })
    return { Utils }
  },
})
</script>


<style>
</style>