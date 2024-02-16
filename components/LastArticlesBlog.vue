<script setup lang="ts">
import { format } from 'date-fns'
import { enUS,pl,ru } from 'date-fns/locale'

const { locale } = useI18n()
const prismic = usePrismic()
const { data: articles } = useAsyncData('$articles', () =>
  prismic.client.getAllByType("article", { lang: locale.value })
)
const settings = useSettings()

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const locales = { 'en-US': enUS, 'pl': pl, 'ru': ru }
  return format(date, 'dd MMMM yyyy', { locale: locales[locale.value] })
}

const { data: latestArticles } = useAsyncData('$latestArticles', () =>
  prismic.client.getAllByType("article", {
    limit: 3, lang: locale.value,
    orderings: [
      { field: "document.first_publication_date", direction: "asc" },
    ],
  })
)

</script>

<template>
<!-- <pre>{{ latestArticles }}</pre> -->
<div class="bg-green-500">
    <div class="bg-gray-500 max-w-6xl mx-auto">
        <div class="grid grid-cols-3 gap-4">
            <div v-for="article in latestArticles" :key="article.id">
            <PrismicRichText :field="article.data.title" />
            {{ formatDate(article.data.publish_date) }}
            <PrismicImage :field="article.data.featured_image" />
            <PrismicRichText :field="article.data.excerpt" />
            <NuxtLink :to="`${locale === 'en-us' ? '' : locale + '/'}article/${article.uid}`">Read more</NuxtLink>            
            </div>
        </div>
    </div>
</div>

</template>