<template>
  <div
    class="bg-white p-[0.9rem] ring-1 ring-gray-200 rounded-2xl p-6 shadow rounded-xl mb-9 relative text-center"
    v-if="category"
  >
    <div class="mb-6">
      <div class="flex items-center justify-center mb-2">
        <img :src="category.icon" class="mr-2 pr-1 h-[26px] text-slate-100" />
        <h2 class="text-gray-900 text-lg font-semibold leading-8">
          {{ category.name }}
        </h2>
      </div>
      <p class="text-base leading-[1.7] text-slate-700">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit..
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props: any = defineProps({ category: { type: Object } });

const emit = defineEmits(["openCategoryModal"]);
function openModal() {
  emit("openCategoryModal", props.category.modal_name);
}
</script>
