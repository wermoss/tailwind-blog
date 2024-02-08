// // Fetch data from settings
// export const useSettings = () => {
//     const prismic = usePrismic()
//     return useAsyncData('$settings', () => {
//         return prismic.client.getSingle("settings")
//     }).data
//   }

  export const useSettings = () => {
    const { locale } = useI18n()
    const prismic = usePrismic()
    return useAsyncData(
      '$settings',
      () => prismic.client.getSingle('settings', { lang: locale.value}),
      { watch: [locale]}
    ).data
  }
  