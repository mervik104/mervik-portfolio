// Восстановление выбранного языка из куки ПОСЛЕ гидрации.
// Локаль определяется до гидрации только дефолтом (ru), как и в
// предрендеренном HTML, поэтому мистматчей нет; здесь мы просто
// реактивно переключаем язык, если пользователь раньше выбрал другой.
export default defineNuxtPlugin(nuxtApp => {
    // useI18n() в плагине нельзя (только в setup) — берём готовый инстанс
    const route = useRoute()
    const saved = useCookie<'ru' | 'en'>('lang', { maxAge: 31536000, sameSite: 'lax' })
    const i18n = nuxtApp.$i18n

    nuxtApp.hook('app:mounted', () => {
        // на тик позже mount: иначе unhead перезатрёт <html lang> значением из SSR
        setTimeout(() => {
            // на /resume/:lang локаль задаётся URL, куку игнорируем
            if (route.params.lang) return
            if (saved.value !== 'ru' && saved.value !== 'en') return
            if (saved.value !== i18n.locale.value) i18n.setLocale(saved.value)
        }, 0)
    })
})
