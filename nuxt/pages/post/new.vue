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
        <v-text-field placeholder="제목 입력"></v-text-field>
      </v-col>
      <v-col cols="12">
        <client-only>
          <editor ref="editor" :initial-value="text" align="left"> </editor>
          <viewer v-if="toggle" :initial-value="text"></viewer>
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from '@vue/composition-api'
import { ViewSetAPI } from '@/API'
const CateogoryAPI = new ViewSetAPI('blog/category')

export default defineComponent({
  setup() {
    const categories = ref([])
    const text = ref('이곳에 글을 써주세요')
    const toggle = ref('false')
    const selectedCategory = ref('')
    const selectedCategories = ref([])
    onMounted(async () => {
      categories.value = await CateogoryAPI.getAxios()
      // categories.value = []
      // categoriesRes.forEach((element) => {
      //   categories.value.push(element.name)
      // })
    })
    watch(selectedCategory, (val) => {
      let alreadyExist = false
      // console.log(val)
      console.log('watch!!')
      selectedCategories.value.forEach((element) => {
        console.log(element)
        if (element === val) {
          alreadyExist = true
        }
      })
      console.log('alreadyExist', alreadyExist)
      if (!alreadyExist) {
        selectedCategories.value.push(val)
      }
    })
    return { categories, text, toggle, selectedCategory, selectedCategories }
  },
})
</script>



<style>
</style>