<template>
  <div class="w-screen h-screen overflow-auto">
    <slot name="navbar" />
    <div class="max-w-7xl mx-auto px-[1.15rem]">
      <slot name="content" />
      <div class="grid grid-cols-12 lg:mt-0 mt-6">
        <div class="xl:col-start-2 col-span-12 xl:col-span-10">
          <div class="grid grid-cols-12 md:gap-x-3 lg:gap-x-0">
            <div class="col-span-12 md:col-span-4 order-1 xl:col-span-3">
              <slot name="right-side" />
            </div>
            <div
              class="col-span-12 md:col-span-4 xl:col-span-6 sticky md:static top-0 order-3 md:order-2"
            >
              <slot name="stark" />
            </div>
            <div
              class="col-span-12 md:col-span-4 xl:col-span-3 order-2 md:order-2"
            >
              <slot name="left-side" />
            </div>
          </div>
          <div class="lg:col-span-12 order-4">
            <div class="grid grid-cols-12">
              <div class="col-span-12"></div>
            </div>
          </div>
        </div>
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>
