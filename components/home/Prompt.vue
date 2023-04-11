<template>
  <div
    v-for="(message_object, index) in props.prompt"
    :key="index"
    :class="
      message_object &&
      message_object.from &&
      message_object.from == 'candidate'
        ? 'justify-end'
        : 'justify-start '
    "
  >
    <template
      v-if="
        message_object && message_object.from && message_object.from == 'stark'
      "
    >
      <div class="text-[#505050] text-sm">
        {{ message_object.message }}
      </div>
    </template>
    <template
      v-if="
        message_object &&
        message_object.from &&
        message_object.from == 'candidate'
      "
    >
      <div
        class="bg-[#d4c7f7] inline-block py-[8px] px-[15px] rounded-t-xl rounded-bl-xl mb-2 text-[16px] mr-3"
      >
        {{ message_object.message }}
      </div>
      <img
        src="/images/banner-img.png"
        class="h-[44px] w-[44px] border rounded-full object-cover"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["prompt"]);
</script>
