<template>
  <div style="margin-top: 72px">
    <v-row>
      <v-col cols="12">
        <span>Categories: </span>
        <v-chip
          v-for="(category, index) in selectedCategories"
          :key="index"
          style="margin-right: 4px"
          close
          small
          label
          @click:close="selectedCategories.splice(index, 1)"
        >
          {{ category }}
        </v-chip>
        <v-select
          v-model="selectedCategory"
          placeholder="Category 선택"
          :items="categories"
          item-text="name"
        ></v-select>
        <v-text-field
          v-model="localPost.title"
          placeholder="제목 입력"
        ></v-text-field>
        <v-text-field
          v-model="localPost.sub_title"
          placeholder="부제목 입력"
        ></v-text-field>
      </v-col>
      <v-col cols="12" style="height: 500px">
        <client-only>
          <editor
            v-if="text !== ''"
            ref="toastuiEditor"
            :initial-value="text"
            align="left"
          >
          </editor>
          <viewer v-if="toggle" :initial-value="text"></viewer>
        </client-only>
      </v-col>
      <v-col>
        <v-btn @click="savePost">저장</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  reactive,
  getCurrentInstance,
} from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
import swal from '@/plugins/sweet-alerts'
const PostAPI = new ViewSetAPI('blog/post')
const CategoryAPI = new ViewSetAPI('blog/category')

export default defineComponent({
  props: {
    post: {
      type: Object,
      default: () => {
        return {
          title: '',
          sub_title: '',
          html: '',
          categories: [],
        }
      },
    },
  },
  setup(props, { root }) {
    // const router = root._router
    const params = root._route.params
    const text = ref('')
    if (params.id === 'new') {
      text.value = '이곳에 글을 써주세요'
    }
    const currentInstance = getCurrentInstance()
    const categories = ref([])
    const toggle = ref('false')
    const selectedCategory = ref('')
    const selectedCategories = ref([])
    const localPost = reactive({
      title: '',
      sub_title: '',
      html: '',
      categories: [],
    })

    const toastuiEditor = ref(null)
    onMounted(async () => {
      categories.value = await CategoryAPI.getAxios()
    })
    const getHTML = () => {
      localPost.html = toastuiEditor.value.invoke('getHTML')
    }
    const savePost = async () => {
      getHTML()
      const res = await PostAPI.postAxios(localPost)
      swal.apiResponse(currentInstance, res, '게시글이 저장되었습니다.')
    }
    watch(selectedCategory, (val) => {
      let alreadyExist = false
      selectedCategories.value.forEach((element) => {
        if (element === val) {
          alreadyExist = true
        }
      })
      if (!alreadyExist) {
        selectedCategories.value.push(val)
      }
      const selectedCategoriesIds = []
      categories.value.forEach((element) => {
        if (selectedCategories.value.includes(element.name)) {
          selectedCategoriesIds.push(element.id)
        }
      })
      localPost.categories = selectedCategoriesIds
    })
    watch(props, () => {
      localPost.title = props.post.title
      localPost.sub_title = props.post.sub_title
      text.value = props.post.html
      props.post.categories.forEach((el) => {
        selectedCategories.value.push(el.name)
      })
    })
    watch(toastuiEditor, () => {
      if (toastuiEditor.value !== undefined) {
        toastuiEditor.value.invoke('setHeight', '500px')
        toastuiEditor.value.invoke('changePreviewStyle', 'tab')
      }
    })
    return {
      categories,
      text,
      toggle,
      selectedCategory,
      selectedCategories,
      localPost,
      savePost,
      getHTML,
      toastuiEditor,
    }
  },
})
</script>
