export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@vesp/nuxt-fontawesome',
    ],

    i18n: {
        vueI18n: './locales/index'
    },

    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },

    css: [
        'assets/scss/app.scss'
    ]
})
