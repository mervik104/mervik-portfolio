<template>
    <footer class="mt-24 md:mt-32 pt-8 md:pt-10 border-t border-neutral-900 reveal reveal-delay-5">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
            <div class="text-left md:text-right space-y-2 shrink-0">
                <div class="font-mono text-neutral-600 text-[10px]">
                    {{ t('footer.rights') }}
                </div>
            </div>
        </div>
    </footer>
</template>
<script lang="ts" setup>
const { t } = useI18n()

</script>