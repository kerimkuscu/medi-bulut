import en from './en/index.js'
import tr from './tr/index.js'

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
    return {
        legacy: false,
        locale: 'tr',
        messages: {
            en,
            tr
        }
    }
})