<template>
  <NuxtLayout name="home-1">
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
      <CharacterMain />
    </template>
  </NuxtLayout>
</template>
