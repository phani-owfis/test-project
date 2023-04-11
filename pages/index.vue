<template>
  <NuxtLayout :name="`home-${layout}`">
    <template #navbar>
      <HomeNavbar />
    </template>
    <template #content>
      <HomeBanner />
    </template>
    <template #right-side>
      <HomeMain
        :category="{
          btn_label: 'Lorem ipsum',
          name: 'Jobs',
          description: 'Get the perfect job that is 100% match',
        }"
      />
      <HomeMain
        :category="{
          btn_label: 'Lorem',
          name: 'Lorem ipsum',
          description: 'Get a personalized profile and is ideal for each job',
        }"
      />
    </template>
    <template #left-side>
      <HomeMain
        :category="{
          name: 'Loreum ipsum',
          description: 'Praactise makes perfect, Attend mock interviews',
        }"
      />
      <HomeMain
        :category="{
          name: 'Lorem Ipsum',
          description: 'Get insights for bright feature',
        }"
      />
    </template>
    <template #stark>
      <CharectorMain />
    </template>
  </NuxtLayout>
</template>
<script setup type="ts">
let router = useRoute().query;
const layout = router?.layout ? router?.layout  : 1 ;

const opened_modal_name = ref(null);
const candidate_main_ref=ref();
function openModal(modal_name) {
  opened_modal_name.value=modal_name;
  candidate_main_ref.value.openModal(opened_modal_name,'');
}
</script>
