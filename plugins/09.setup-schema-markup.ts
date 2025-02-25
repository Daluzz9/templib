export default defineNuxtPlugin(({ $domainUrl, $config }) => {
  const brandName = $config.public.BRAND_NAME.toUpperCase();
  const imageUrl = $config.public.NUXT_APP_CDN_URL;

  // TODO update schema from MKT
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Casino", // TODO confirm Casino or LocalBusiness
          name: brandName,
          alternateName: `${brandName} - Top 1 Nhà Cái Thể Thao, Bóng Đá, Live Casino, Đá Gà`,
          "@id": `${$domainUrl}/`,
          url: `${$domainUrl}/`,
          logo: `${imageUrl}/assets/brand/logo.svg`, // TODO Provide the logo URL
          image: `${imageUrl}/assets/brand/seo-image.webp?h=${$config.public.APP_VERSION.slice(0, 3)}`, // TODO Provide an image URL
          description: `${brandName} là trang web cá độ bóng đá trực tuyến, thể thao uy tín hàng đầu tại Việt Nam. Đảm bảo cược bóng đá tại ${brandName} hoàn toàn hợp pháp 100%.`,
          keywords: $config.public.BRAND_NAME.toLowerCase(),
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
          additionaltype: ["https://en.wikipedia.org/wiki/Online_casino ", "https://en.wikipedia.org/wiki/Gambling "],
          sameAs: [], // TODO add link social
        }),
      },
    ],
  });
});
