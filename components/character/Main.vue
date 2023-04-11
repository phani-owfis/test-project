<template>
  <div class="h-full w-full flex flex-col relative">
    <CharacterAvatar :character="defaultCharacter" />
  </div>
</template>
<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import { Modal } from "flowbite";
import data from "../../data/1.json";
const defaultCharacter = data;
// Set and Get functions for avatar state.

const avatar_render = ref(0);
const avatar_builder_render = ref(0);
const open_modal = ref(false);

// Load textures customizations from default data
const {
  default_skin_tones,
  default_textures,
  default_character,
  full_character,
} = defaultAvatarData();

// Toggle modal for avatar customizations
function toggleModal(params: any) {
  open_modal.value = !open_modal.value;
  const input = document.getElementById(
    "customize-avatar"
  ) as HTMLInputElement | null;
  const modal = new Modal(input, { backdropClasses: "" });
  if (params) modal.hide();
  else {
    avatar_builder_render.value++;
    modal.show();
  }
}
</script>
<!-- Stark component  -->
<style scoped></style>
