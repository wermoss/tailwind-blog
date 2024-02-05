<script setup lang="ts">
    const settings = useSettings();
</script>
<template>
    <div class="bg-red-500">    
        <div class="bg-yellow-500 max-w-6xl mx-auto flex justify-between">
            <div class="bg-green-500">{{ settings?.data.site_title }}</div>
            <div class="bg-blue-500">
                <nav>
                    <ul class="flex">
                        <li 
                            v-for="item in settings?.data.navigation" 
                            :key="item.label ?? ''">
                            <PrismicLink :field="item.link">{{ item.label }}</PrismicLink>
                        </li>
                    </ul>  
                </nav>
            </div>
        </div>
    </div>
</template>
