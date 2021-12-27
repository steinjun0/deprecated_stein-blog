<template>
  <v-row>
    <v-col cols="12"> 카테고리 생성 </v-col>
    <v-col v-for="(category, index) in categories" :key="index" cols="12">
      {{ category }}
    </v-col>
    <v-col cols="8">
      <v-form>
        <v-text-field
          v-model="newCategory.name"
          :counter="10"
          label="name"
          required
        ></v-text-field>
        <v-select
          v-model="newCategory.type"
          label="type"
          :items="categoryTypes"
          required
        ></v-select>
        <v-select
          v-model="tempNewCategoryParent"
          label="parent"
          required
          :items="parentsName"
        ></v-select>
      </v-form>
    </v-col>
    <v-col cols="4">
      <v-btn @click="createCategory">생성</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  watch,
} from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
const CateogoryAPI = new ViewSetAPI('blog/category')
export default defineComponent({
  setup() {
    const categories = ref([])
    const newCategory = reactive({
      name: '',
      type: 'sub',
      parentId: '',
    })
    const categoryTypes = ['main', 'sub']
    const tempNewCategoryParent = ref('')
    watch(tempNewCategoryParent, (val) => {
      if (val === 'No Parent') {
        newCategory.parentId = ''
      } else {
        categories.value.forEach((element) => {
          if (element.name === val) {
            newCategory.parentId = element.id
          }
        })
      }
    })
    onMounted(async () => {
      categories.value = await CateogoryAPI.getAxios()
    })
    const parentsName = computed(() => {
      const result = ['No Parent']
      categories.value.forEach((element) => {
        if (element.type === 'main') {
          result.push(element.name)
        }
      })
      return result
    })
    const createCategory = async () => {
      await CateogoryAPI.postAxios(newCategory)
      categories.value = await CateogoryAPI.getAxios()
    }
    return {
      categories,
      newCategory,
      categoryTypes,
      parentsName,
      tempNewCategoryParent,
      createCategory,
    }
  },
})
</script>


<style>
</style>