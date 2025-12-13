import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://camille-osteopathe.com';
  const locales = ['fr', 'pt', 'en'] as const;
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: 'osteopathie', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: 'trauma', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: 'contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Générer les URLs pour chaque langue et page
  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = page.path
        ? `${baseUrl}/${locale}/${page.path}`
        : `${baseUrl}/${locale}`;

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            fr: page.path ? `${baseUrl}/fr/${page.path}` : `${baseUrl}/fr`,
            pt: page.path ? `${baseUrl}/pt/${page.path}` : `${baseUrl}/pt`,
            en: page.path ? `${baseUrl}/en/${page.path}` : `${baseUrl}/en`,
          },
        },
      });
    });
  });

  return sitemap;
}
