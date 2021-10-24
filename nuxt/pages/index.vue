<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-btn @click="switchShow">{{ show }}</v-btn>
      <transition name="fade">
        <v-card
          v-if="show"
          width="160px"
          height="90px"
          style="padding: 16px"
          class="d-flex justify-center align-center"
        >
          <span>안녕하세요</span>
        </v-card>
      </transition>
    </v-col>
  </v-row>
</template>
<script>
import { defineComponent, ref, onMounted } from "@vue/composition-api";
export default defineComponent({
  setup() {
    const show = ref(false);
    const delayFunction = (func, input = 100) => {
      return () => {
        setTimeout(func, input);
      };
    };
    const switchShow = (input = undefined) => {
      if (typeof input !== "boolean") {
        show.value = !show.value;
      } else {
        show.value = input;
      }
    };
    onMounted(delayFunction(switchShow, 1000));
    return { show, switchShow };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
