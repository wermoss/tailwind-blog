<script setup lang="ts">
    const navigation = useNavigation()
    const settings = useSettings()
    const alternateLanguages = useAlternateLanguages()

    const localePath = useLocalePath()
</script>

<template>
    <div class="bg-red-500">    
        <div class="bg-yellow-500 max-w-6xl mx-auto flex justify-between">
            <div class="bg-green-500">
                <NuxtLink :to="localePath('/')">
                    <PrismicImage
                    v-if="settings?.data.logo.url"
                    :field="settings?.data.logo"
                    />
                </NuxtLink>
            </div>
            <div class="bg-blue-500">
                <nav>
                    <ul class="flex">
                        <li 
                            v-for="item in navigation?.data.links"
                            :key="(item.label)">
                            <PrismicLink :field="item.link">{{ item.label }}</PrismicLink>
                        </li>
                        <li
                            v-for="lang in alternateLanguages"
                            :key="lang.lang"
                        >
                        <PrismicLink :field="{ ...lang, link_type: 'Document' }">
                            <span> {{ lang.lang.slice(0, 2).toUpperCase() }} </span>
                        </PrismicLink>
                        </li>
                    </ul>  
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped>
li {
    margin-left: 20px;
    margin-right: 20px;
}
</style>