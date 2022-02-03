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
      <v-col cols="12" style="min-height: 300px" class="editor">
        <client-only>
          <quill-editor
            ref="editor"
            v-model="localPost.html"
            :options="editorOption"
          />
        </client-only>
      </v-col>
      <v-col class="d-flex">
        <v-btn @click="savePost">저장</v-btn>
        <v-btn
          v-if="!isNewPost"
          style="margin-left: auto"
          class="red lighten-2 white--text"
          @click="deletePost"
          >삭제</v-btn
        >
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
    const router = root._router
    const params = root._route.params
    const isNewPost = params.id === 'new'

    const editorOption = ref({
      // Some Quill options...
      // theme: 'snow',
      modules: {
        imageResize: true,
        imageDrop: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          // [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
    })

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
    if (isNewPost) {
      localPost.html = '<p>이곳에 글을 써주세요</p>'
    }

    onMounted(async () => {
      categories.value = await CategoryAPI.getAxios()
    })
    const getHTML = () => {}
    const savePost = async () => {
      getHTML()
      if (isNewPost) {
        const res = await PostAPI.postAxios(localPost)
        swal.apiResponse(
          currentInstance,
          res,
          '게시글이 저장되었습니다.',
          () => {
            router.push(`/`)
          }
        )
      } else {
        const res = await PostAPI.patchAxios(params.id, localPost)
        swal.apiResponse(
          currentInstance,
          res,
          '게시글이 수정되었습니다.',
          () => {
            router.push(`/post/${res.id}`)
          }
        )
      }
    }
    const deletePost = async () => {
      const res = await PostAPI.deleteAxios(params.id, '')
      swal.apiResponse(currentInstance, res, '게시글이 삭제되었습니다', () => {
        router.push(`/`)
      })
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
      localPost.html = props.post.html
      props.post.categories.forEach((el) => {
        selectedCategories.value.push(el.name)
      })
    })

    return {
      categories,
      editorOption,
      toggle,
      selectedCategory,
      selectedCategories,
      localPost,
      isNewPost,
      savePost,
      deletePost,
      getHTML,
    }
  },
})
</script>

<style>
.editor .ql-container {
  max-height: 800px;
  overflow-y: scroll;
}
</style>