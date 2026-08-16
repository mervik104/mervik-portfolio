export interface HighlightToken {
    text: string
    class?: string
}

export function useRichText() {
    const { tm } = useI18n()

    // Разбирает шаблон сообщения (с плейсхолдерами {key}) на абзацы и сегменты.
    // Используется вместо <I18nT>, который при SSG-рендере генерил warning
    // "[intlify] Not found parent scope. use the global scope."
    function richSegments(key: string, highlights: Record<string, HighlightToken>): HighlightToken[][] {
        const template = String(tm(key) ?? '')

        return template
            .split('\n\n')
            .map(paragraph =>
                paragraph
                    .split(/\{(\w+)\}/)
                    .map((part, i) => {
                        if (i % 2 === 1) {
                            const h = highlights[part]
                            return h ? { ...h } : { text: `{${part}}` }
                        }
                        return part === '' ? null : { text: part }
                    })
                    .filter((s): s is HighlightToken => s !== null),
            )
            .filter(p => p.length > 0)
    }

    return { richSegments }
}
