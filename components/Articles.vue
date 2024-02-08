<script setup lang="ts">
const { locale } = useI18n()
const prismic = usePrismic()
const { data: articles } = useAsyncData('$articles', () =>
  prismic.client.getAllByType("article", { lang: locale.value })
)
const settings = useSettings()



</script>

<template>
<div class="bg-green-500">
    <div class="bg-gray-500 max-w-6xl mx-auto">
        <div class="grid grid-cols-4 gap-4">
            <div v-for="article in articles">
                <PrismicRichText :field="article.data.title" />
                {{ article.data.publish_date }}
            <PrismicImage :field="article.data.featured_image" />
            <PrismicRichText :field="article.data.excerpt" />
            </div>

        </div>
    </div>
</div>

</template>