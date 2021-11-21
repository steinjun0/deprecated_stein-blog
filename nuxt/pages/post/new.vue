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
          v-model="post.title"
          placeholder="제목 입력"
        ></v-text-field>
        <v-text-field
          v-model="post.sub_title"
          placeholder="부제목 입력"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <client-only>
          <editor ref="toastuiEditor" :initial-value="text" align="left">
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
  setup() {
    const currentInstance = getCurrentInstance()
    const categories = ref([])
    const text = ref('이곳에 글을 써주세요')
    const toggle = ref('false')
    const selectedCategory = ref('')
    const selectedCategories = ref([])
    const post = reactive({
      title: '',
      sub_title: '',
      html: '',
      categories: [],
    })
    const toastuiEditor = ref(null)
    onMounted(async () => {
      console.log(swal)
      swal.success(currentInstance, 'hihi')
      categories.value = await CategoryAPI.getAxios()
      // categories.value = []
      // categoriesRes.forEach((element) => {
      //   categories.value.push(element.name)
      // })
    })
    const getHTML = () => {
      post.html = toastuiEditor.value.invoke('getHTML')
    }
    const savePost = async () => {
      getHTML()
      await PostAPI.postAxios(post)
    }
    watch(selectedCategory, (val) => {
      let alreadyExist = false
      // console.log(val)
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
        console.log('element.name', element.name)
        if (selectedCategories.value.includes(element.name)) {
          selectedCategoriesIds.push(element.id)
        }
      })
      post.categories = selectedCategoriesIds
    })
    return {
      categories,
      text,
      toggle,
      selectedCategory,
      selectedCategories,
      post,
      savePost,
      getHTML,
      toastuiEditor,
    }
  },
})
</script>
