<template>
  <nav class="bg-white">
    <div class="px-2">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>

            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <nuxt-link to="/packages">
              <img class="h-8 w-auto" src="https://www.medibulut.com/storage/pages/general/logo.svg" alt="Your Company">
            </nuxt-link>
          </div>
          <div class="hidden sm:ml-6 sm:mt-2 sm:block">
            <div class="flex space-x-4">
              <nuxt-link class="active border-b-2 border-blue-500 font-medium" aria-current="page" to="/packages">
                {{ $t('layouts.navbar.package_identification') }}
              </nuxt-link>

              <nuxt-link class="hover:border-b-2 border-gray-100 font-medium" to="/applied-packages">
                {{ $t('layouts.navbar.package_usage') }}
              </nuxt-link>

              <nuxt-link class="hover:border-b-2 border-gray-100 font-medium" to="/packages-usages">
                {{ $t('layouts.navbar.package_movements') }}
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="locale-changer">
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.value">
                {{ lang.text }}
              </option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <nuxt-link to="/packages" class="active border-b-2 border-blue-500 font-medium" aria-current="page">{{ $t('layouts.navbar.package_identification') }}</nuxt-link>
        <nuxt-link to="/applied-packages" class="hover:border-b-2 border-gray-100 block rounded-md px-3 py-2 text-base font-medium">{{ $t('layouts.navbar.package_usage') }}</nuxt-link>
        <nuxt-link to="/packages-usages" class="hover:border-b-2 border-gray-100 block rounded-md px-3 py-2 text-base font-medium">{{ $t('layouts.navbar.package_movements') }}</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  data: () => ({
    langs: [
      {text: 'TR', value: 'tr'},
      {text: 'EN', value: 'en'},
    ]
  })
}
</script>
