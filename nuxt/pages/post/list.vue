<template>
  <v-row style="position: relative">
    <!-- <div>
      <div style="position: relative" class="hover-effect">
        <span style="z-index: 100">hihi</span>
        hello
      </div>
    </div> -->
    <v-col
      v-for="(post, index) in postList"
      :key="index"
      class="d-flex flex-column hover-effect"
      style="
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        cursor: pointer;
        margin-bottom: 12px;
        padding: 12px 4px;
      "
      cols="12"
      @click="router.push(`/post/${post.id}`)"
    >
      <div style="font-size: 12px; margin-left: 3px; margin-bottom: 4px">
        [<span v-for="(category, pIndex) in post.categories" :key="pIndex">
          {{ category.name }}
          {{ pIndex + 1 !== post.categories.length ? ', ' : '' }} </span
        >]
      </div>
      <div style="font-size: 24px; font-weight: 500; margin-bottom: 8px">
        {{ post.title.replace('\\', ' ') }}
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
  setup(props, { root }) {
    const router = root._router

    const postList = ref([])
    onMounted(async () => {
      const convertToList = (elem) => {
        if (elem === undefined) {
          return []
        } else if (typeof elem === 'string') {
          return [elem]
        } else {
          return elem
        }
      }
      const filteringCategories = convertToList(root._route.query.category)
      const getCategoriesUrlQuery = () => {
        if (filteringCategories.length === 0) {
          return ''
        }
        let query = '/?'
        filteringCategories.forEach((category) => {
          query += `categories=${category}&`
        })
        query.slice(0, -1)
        return query
      }
      const filteredCategoriesUrlQuery = getCategoriesUrlQuery()

      postList.value = await PostAPI.getAxios(
        `get_category_filtered_list${filteredCategoriesUrlQuery}`
      )
    })
    return { postList, Utils, router }
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  inset: 0 0 0 0;
  /* background: rgba(243, 243, 243, 1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  z-index: -1;
  transition: transform 0.3s ease;
}
.hover-effect {
  z-index: 1;
  position: relative;
}
</style>