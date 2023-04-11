<template>
  <div class="flex h-full absolute right-0 top-0">
    <div class="flex flex-nowrap">
      <div
        class="h-full p-[1.8rem] bg-[rgba(21,22,35,.5)] md:max-w-[340px] md:w-[340px] custom-scroll"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6"
          :key="render"
        >
          <div
            class="cursor-pointer flex items-center justify-center pr-3 pt-3"
            @click="selectedTexture(selected_texture.name, 0)"
            v-if="showClearIcon()"
          >
            <img
              :src="`/images/avatar/textures/clear-icon.svg`"
              class="rounded-lg cursor-pointer"
            />
          </div>
          <div
            v-for="texture_index in selected_texture.count"
            :key="texture_index"
            class="cursor-pointer"
            @click="selectedTexture(selected_texture.name, texture_index)"
          >
            <img
              :src="`/images/avatar/textures/${selected_texture.name}/${texture_index}.png`"
              class="rounded-lg"
            />
          </div>
        </div>
      </div>
      <div
        class="bg-[#2a2d44] p-[1.4rem] flex flex-col border-l border-[#2a2d44] shrink-0"
      >
        <div
          class="cursor-pointer mb-6"
          v-for="(item, obj_index) in customization_textures"
          :key="obj_index"
          @click="
            render++;
            showFocus(item);
          "
        >
          <img
            :src="`/images/avatar/accessories/${item.name}.svg`"
            class="h-[42px] hover:brightness-[100]"
            :class="active_texture == item.name ? 'brightness-[100]' : ''"
          />
        </div>
      </div>
    </div>
    <div class="absolute right-[8px] top-[-49px]">
      <button
        type="button"
        class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="$emit('emitSave')"
      >
        <CheckIcon class="w-[17px] shrink-0" />
        Save
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";

// Get textures and skins as prop
const props = defineProps(["customization_textures", "skin_tones"]);
const active_texture = ref("clothes");
const render = ref(0);
const selected_texture: any = ref(
  props?.customization_textures ? props.customization_textures[0] : {}
);
// Define emits for focus
const emit = defineEmits(["focusTexture", "emitTexture"]);
function showClearIcon() {
  return selected_texture.value.name == "clothes" ||
    selected_texture.value.name == "eyes" ||
    selected_texture.value.name == "eyebrows"
    ? false
    : true;
}
function showFocus(texture: any) {
  if (selected_texture.value.type != texture.type)
    emit("focusTexture", texture.name);
  selected_texture.value = texture;
  active_texture.value = texture.name;
}
function selectedTexture(texture_name: any, texture_index: any) {
  let texture_format =
    texture_name == "eyes" || texture_name == "eyebrows" ? ".png" : ".glb";
  emit(
    "emitTexture",
    texture_index ? `${texture_name}/${texture_index + texture_format}` : "",
    texture_name,
    texture_index
  );
}
</script>
<style scoped>
.custom-scroll {
  overflow: overlay !important;
}
.custom-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  color: transparent;
  background-color: transparent !important;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #5a5e78;
  border-radius: 6px;
  color: transparent;
}
.custom-scroll::-webkit-scrollbar-track-piece {
  display: none;
}
</style>
