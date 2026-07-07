import { MetadataRoute } from 'next'
import { SERVICES } from './diensten/services'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://telestomotors.nl',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://telestomotors.nl/plans',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://telestomotors.nl/diensten',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://telestomotors.nl/over-ons',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://telestomotors.nl/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...SERVICES.map((s) => ({
      url: `https://telestomotors.nl/diensten/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://telestomotors.nl/privacybeleid',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
